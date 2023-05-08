require('dotenv').config()
const {PORT} = process.env
const express = require("express")
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/Post')

const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/Posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")
const {register, login, logout} = require("./controllers/Auth")

const app = express()

User.hasMany(Post)
Post.belongsTo(User)


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

//sequelize.sync(force:true)
sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
}).catch(err => console.error(err))