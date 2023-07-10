import { Post } from '@prisma/client'
import prisma from '../db'

export const getPostByID = async (id: number): Promise<Post | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    })

    return post
  } catch (err) {
    console.error('Erro ao buscar post por ID:', err)
    return null
  }
}

export const getAllPosts = async (): Promise<Post[] | null> => {
  try {
    const posts = await prisma.post.findMany()
    return posts
  } catch (err) {
    console.error('Erro ao buscar todos os posts:', err)
    return null
  }
}
export const getAllPostsByAuthor = async (
  authorId: number,
): Promise<Post[] | null> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    })
    return posts
  } catch (err) {
    console.error('Erro ao buscar todos os posts:', err)
    return null
  }
}

export const createPost = async (post: Post): Promise<Post | null> => {
  try {
    const createdPost = await prisma.post.create({
      data: post,
    })

    return createdPost
  } catch (err) {
    console.error('Erro ao criar post:', err)
    return null
  }
}

export const updatePost = async (
  id: number,
  post: Post,
): Promise<Post | null> => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: post,
    })

    return updatedPost
  } catch (err) {
    console.error('Erro ao atualizar post:', err)
    return null
  }
}

export const deletePost = async (id: number): Promise<boolean> => {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    })

    return true
  } catch (err) {
    console.error('Erro ao deletar post:', err)
    return false
  }
}
