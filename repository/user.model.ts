import { Prisma, User } from '@prisma/client'
import prisma from '../db'
import { HandlerError, UserReturn } from '../types'

export const getUserByID = async (id: number): Promise<UserReturn | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    return user
  } catch (err) {
    console.error('Erro ao buscar usuário por ID:', err)
    return null
  }
}
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    return user
  } catch (err) {
    console.error('Erro ao buscar usuário por Email:', err)
    return null
  }
}

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })
    return users as Array<User>
  } catch (err) {
    console.error('Erro ao buscar todos os usuários:', err)
    return null
  }
}

export const createUser = async (
  user: User,
): Promise<User | null | HandlerError> => {
  try {
    const createdUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    return createdUser as User
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e?.code === 'P2002') {
        return null
      }
    }
    console.error('Erro ao criar usuário:', e)
    return null
  }
}

export const updateUser = async (
  id: number,
  user: User,
): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    return updatedUser as User
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err)
    return null
  }
}

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    })

    return true
  } catch (err) {
    console.error('Erro ao deletar usuário:', err)
    return false
  }
}
