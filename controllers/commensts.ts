import { Request, Response } from 'express'
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentByID,
  getCommentsByAuthor,
  getCommentsByPost,
  updateComment,
} from '../repository/comments.model'

const commentController = {
  getOne: async (req: Request, res: Response) => {
    const commentId = parseInt(req.params.id)

    try {
      const comment = await getCommentByID(commentId)
      if (comment) {
        return res.status(200).json({
          status: 'success',
          data: comment,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'comment not found',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar comentario por ID:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  getByAuthor: async (req: Request, res: Response) => {
    const authorId = parseInt(req.params.authorId)

    try {
      const comment = await getCommentsByAuthor(authorId)
      if (comment) {
        return res.status(200).json({
          status: 'success',
          data: comment,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'comment not found',
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
  getByPost: async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId)

    try {
      const comment = await getCommentsByPost(postId)
      if (comment) {
        return res.status(200).json({
          status: 'success',
          data: comment,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'comment not found',
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
      const comments = await getAllComments()
      if (comments && comments.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: comments,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'No comments found',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar todos os comments:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  createOne: async (req: Request, res: Response) => {
    const newcomment = req.body

    try {
      const response = await createComment(newcomment)
      if (response) {
        return res.status(201).json({
          status: 'success',
          data: response,
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
    const commentID = parseInt(req.params.id)
    const newcomment = req.body

    try {
      const response = await updateComment(commentID, newcomment)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'comment not found',
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
    const commentID = parseInt(req.params.id)

    try {
      const response = await deleteComment(commentID)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'comment not found',
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

export default commentController
