import { Request, Response } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from '../repository/user.model'

const userController = {
  getOne: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)

    try {
      const user = await getUserByID(userId)
      if (user) {
        return res.status(200).json({
          status: 'success',
          data: user,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar usuário por ID:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers()
      if (users && users.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: users,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'No users found',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar todos os usuários:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  createOne: async (req: Request, res: Response) => {
    const newUser = req.body

    try {
      const response = await createUser(newUser)
      if (response) {
        return res.status(201).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(400).json({
          status: 'fail',
          message: 'Email already exists',
        })
      }
    } catch (err) {
      console.error('Erro ao criar usuário:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  updateOne: async (req: Request, res: Response) => {
    const userID = parseInt(req.params.id)
    const newUser = req.body

    try {
      const existingUser = await getUserByID(userID)
      if (newUser.email && existingUser?.email !== newUser.email) {
        return res.status(400).json({
          status: 'fail',
          message: 'Modifying email is not allowed',
        })
      }

      const response = await updateUser(userID, newUser)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        })
      }
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    const userID = parseInt(req.params.id)

    try {
      const response = await deleteUser(userID)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        })
      }
    } catch (err) {
      console.error('Erro ao deletar usuário:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
}

export default userController
