import { Request, Response } from 'express'
import CommentService from '../services/CommentService'

export default class CommentController {
  async tolerate(request: Request, response: Response) {
    const { comment } = request.body

    const { user_id } = request
    const business = new CommentService()
    const result = await business.do(comment, user_id)

    return response.json(result)
  }
}

// export default CommentController
