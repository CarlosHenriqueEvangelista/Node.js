import { Request, Response } from 'express'
import LastThreeComments from '../services/ThreeLastCommentsService'

class Last3Comments {
  async tolerate(request: Request, response: Response) {
    const business = new LastThreeComments()

    const result = await business.do()

    return response.json(result)
  }
}

export default Last3Comments
