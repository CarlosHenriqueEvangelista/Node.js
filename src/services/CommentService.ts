import Client from '../prisma/prisma'
import { serverIo } from '../app'

class CommentService {
  async do(text: string, user_id: string) {
    const comments = await Client.comment.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    })

    const UserInfoWebSocket = {
      text: comments.text,
      user_id: comments.user_id,
      created_at: comments.created_at,
      user: {
        name: comments.user.name,
        avatar_url: comments.user.avatar_url
      }
    }

    serverIo.emit('comment_submitted', UserInfoWebSocket)

    return comments
  }
}

export default CommentService
