import { Request, Response } from 'express'
import UserProfileService from '../services/UserProfileService'

class UserProfileController {
  async tolerate(request: Request, response: Response) {
    const { user_id } = request

    const business = new UserProfileService()

    const result = await business.do(user_id)

    return response.json(result)
  }
}

export default UserProfileController
