import Client from '../prisma/prisma'

class LastThreeComments {
  async do() {
    const comment = await Client.comment.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        user: true
      }
    })

    return comment
  }
}

export default LastThreeComments
