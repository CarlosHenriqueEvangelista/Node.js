import axios from 'axios'
import Client from '../prisma/prisma'
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
  access_token: string
  token_type: string
}

interface IUserInfoResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}

class UserAuthenticationService {
  async do(code: string) {
    // const route = 'https://github.com/login/oauth/access_token'

    const { data: AccessTokenResponse } =
      await axios.post<IAccessTokenResponse>(
        'https://github.com/login/oauth/access_token',
        null,
        {
          params: {
            client_id: 'ae5ee30d4e5d1df337ec',
            client_secret: 'd4be8c5c65a5e14184fa1123f99315c13781e0ea',
            code
          },
          headers: {
            Accept: 'application/json'
          }
        }
      )

    const response = await axios.get<IUserInfoResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `${AccessTokenResponse.token_type} ${AccessTokenResponse.access_token}`
        }
      }
    )

    const { login, id, avatar_url, name } = response.data

    let user = await Client.userInfo.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await Client.userInfo.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      '24c2133782db42076d2b98a0cde661d4',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return { token, user }
  }
}

export default UserAuthenticationService
