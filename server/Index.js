require('dotenv').config()
const {PORT} = process.env
const express = require("express")
const cors = require("cors")

const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/Posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")
const {register, login, logout} = require("./controllers/Auth")

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)

app.get('/posts', getAllPosts)

app.get('/userPosts/:id', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)



app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))