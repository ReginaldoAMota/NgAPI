import { NextFunction, Request, Response } from 'express'
import JWT, { Secret, JwtPayload } from 'jsonwebtoken'
import prisma from '../db'
import { getPostByID } from '../repository/post.model'
import { getUserByID } from '../repository/user.model'
import { getCommentByID } from '../repository/comments.model'

interface AuthRequest extends Request {
  decodedToken?: JwtPayload
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization

  const secretKey: Secret =
    process.env.SECRET_KEY || Buffer.from('MINHA_SECRET_KEY')

  if (!token) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'Access denied',
    })
  }

  try {
    const decodedToken = JWT.verify(
      token.split('Bearer ')[1],
      secretKey,
    ) as JwtPayload
    req.decodedToken = decodedToken
    const userId = decodedToken.userId || null
    const id = parseInt(req.params.id)
    const path = req.path.split('/')[2]

    switch (path) {
      case 'user':
        const user = await getUserByID(id)

        if (user?.id === userId) {
          next()
        } else {
          res.status(401).json({
            status: 'Unauthorized',
            message: 'Access denied',
          })
        }
        break

      case 'post':
        const post = await getPostByID(id)

        if (post?.authorId === userId) {
          next()
        } else {
          res.status(401).json({
            status: 'Unauthorized',
            message: 'Access denied',
          })
        }
        break

      case 'comment':
        const comment = await getCommentByID(id)

        if (comment?.authorId === userId) {
          next()
        } else {
          res.status(401).json({
            status: 'Unauthorized',
            message: 'Access denied',
          })
        }
        break

      default:
        next()
        break
    }
  } catch (err) {
    console.error('Erro de autenticação:', err)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}
