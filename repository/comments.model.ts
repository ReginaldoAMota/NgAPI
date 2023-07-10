import { Comments } from '@prisma/client'
import prisma from '../db'

export const getCommentByID = async (id: number): Promise<Comments | null> => {
  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: id,
      },
    })

    return comment
  } catch (err) {
    console.error('Erro ao buscar comentario por ID:', err)
    return null
  }
}

export const getAllComments = async (): Promise<Comments[] | null> => {
  try {
    const comments = await prisma.comments.findMany()
    return comments
  } catch (err) {
    console.error('Erro ao buscar todos os commentarios:', err)
    return null
  }
}
export const getCommentsByAuthor = async (
  authorId: number,
): Promise<Comments[] | null> => {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        authorId: authorId,
      },
    })
    return comments
  } catch (err) {
    console.error('Erro ao buscar todos os commentarios:', err)
    return null
  }
}

export const getCommentsByPost = async (
  postId: number,
): Promise<Comments[] | null> => {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        postId: postId,
      },
    })
    return comments
  } catch (err) {
    console.error('Erro ao buscar todos os commentarios:', err)
    return null
  }
}

export const createComment = async (
  comment: Comments,
): Promise<Comments | null> => {
  try {
    const createdComment = await prisma.comments.create({
      data: comment,
    })

    return createdComment
  } catch (err) {
    console.error('Erro ao criar comentario:', err)
    return null
  }
}

export const updateComment = async (
  id: number,
  comment: Comments,
): Promise<Comments | null> => {
  try {
    const updatedComment = await prisma.comments.update({
      where: {
        id: id,
      },
      data: comment,
    })

    return updatedComment
  } catch (err) {
    console.error('Erro ao atualizar comentario:', err)
    return null
  }
}

export const deleteComment = async (id: number): Promise<boolean> => {
  try {
    await prisma.comments.delete({
      where: {
        id: id,
      },
    })

    return true
  } catch (err) {
    console.error('Erro ao deletar comentario:', err)
    return false
  }
}
