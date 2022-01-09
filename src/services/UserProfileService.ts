import Client from '../prisma/prisma'

class UserProfileService {
  async do(user_id: string) {
    const user = await Client.userInfo.findFirst({
      where: {
        id: user_id
      }
    })

    return user
  }
}

export default UserProfileService
