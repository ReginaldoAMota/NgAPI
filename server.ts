import 'dotenv/config'
import express from 'express'
import userController from './controllers/users'
import postController from './controllers/post'
import commentController from './controllers/commensts'
import { authMiddleware } from './auth/authMiddleware'
import { authControlle } from './controllers/auth'
const app = express()
const port = 3000

app.use(express.json())

//rotas de Autenticação
app.post('/api/login', authControlle.login)

//Rotas relacionadas ao Usuario
app.get('/api/user', userController.getAll)
app.get('/api/user/:id', userController.getOne)
app.post('/api/user', userController.createOne)
app.patch('/api/user/:id', authMiddleware, userController.updateOne)
app.delete('/api/user/:id', userController.deleteOne)

//Rotas relacionadas aos Posts
app.get('/api/post', postController.getAll)
app.get('/api/post/:id', postController.getOne)
app.get('/api/post/author/:authorId', postController.getByAuthor)
app.post('/api/post', authMiddleware, postController.createOne)
app.patch('/api/post/:id', authMiddleware, postController.updateOne)
app.delete('/api/post/:id', authMiddleware, postController.deleteOne)

//Rotas relacionadas aos Commentarios
app.get('/api/comment', commentController.getAll)
app.get('/api/comment/:id', commentController.getOne)
app.get('/api/comment/post/:postId', commentController.getByPost)
app.get('/api/comment/author/:authorId', commentController.getByAuthor)
app.post('/api/comment', authMiddleware, commentController.createOne)
app.patch('/api/comment/:id', authMiddleware, commentController.updateOne)
app.delete('/api/comment/:id', authMiddleware, commentController.deleteOne)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
