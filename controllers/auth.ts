import { Request, Response } from 'express'
import { getUserByEmail, getUserByID } from '../repository/user.model'
import JWT from 'jsonwebtoken'
import { Buffer } from 'buffer'
export const authControlle = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await getUserByEmail(email)

    if (!user || user?.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Login fail',
      })
    }

    const secretKey: JWT.Secret =
      process.env.SECRET_KEY || Buffer.from('MINHA_SECRET_KEY')

    const expiresInMinutes = 60 * 6 // Expira em 6 hrs
    const expirationDate = Math.floor(Date.now() / 1000) + expiresInMinutes * 60
    const payload = {
      userId: user.id,
      exp: expirationDate,
    }

    const token = JWT.sign(payload, secretKey)

    return res.status(200).json({
      status: 'success',
      data: {
        token: token,
      },
    })
  },
}
