import { Request, Response } from 'express'
import UserAuthenticationService from '../services/UserAuthenticationService'

class UserAuthenticationController {
  async tolerate(req: Request, res: Response) {
    const { code } = req.body

    const business = new UserAuthenticationService()
    try {
      const outcome = await business.do(code)
      return res.json(outcome)
    } catch (err) {
      return res.json({ error: err.message })
    }
  }
}

export default UserAuthenticationController
