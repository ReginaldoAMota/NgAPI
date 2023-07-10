export type UserReturn = {
  id: number
  name: string | null
  email: string
  image: string
}

export type HandlerError = {
  code: string
  message: string
}
