import { Request, Response } from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsByAuthor,
  getPostByID,
  updatePost,
} from '../repository/post.model'

const postController = {
  getOne: async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id)

    try {
      const post = await getPostByID(postId)
      if (post) {
        return res.status(200).json({
          status: 'success',
          data: post,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'post not found',
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
  getByAuthor: async (req: Request, res: Response) => {
    const authorId = parseInt(req.params.authorId)

    try {
      const post = await getAllPostsByAuthor(authorId)
      if (post) {
        return res.status(200).json({
          status: 'success',
          data: post,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'post not found',
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
      const posts = await getAllPosts()
      if (posts && posts.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: posts,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'No posts found',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar todos os posts:', err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  },
  createOne: async (req: Request, res: Response) => {
    const newpost = req.body

    try {
      const response = await createPost(newpost)
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
    const postID = parseInt(req.params.id)
    const newpost = req.body

    try {
      const response = await updatePost(postID, newpost)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'post not found',
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
    const postID = parseInt(req.params.id)

    try {
      const response = await deletePost(postID)
      if (response) {
        return res.status(200).json({
          status: 'success',
          data: response,
        })
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'post not found',
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

export default postController
