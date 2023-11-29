require('dotenv').config()
const {PORT} = process.env
const express = require("express")
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/Post')

const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/Posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")
const {register, login} = require("./controllers/Auth")

const app = express()

User.hasMany(Post)
Post.belongsTo(User)

app.use(express.json())
app.use(cors())

app.post('/api/register', register)
app.post('/api/login', login)

app.get('/api/posts', getAllPosts)

app.get('/api/userPosts/:userId', getCurrentUserPosts)
app.post('/api/posts', isAuthenticated, addPost)
app.put('/api/posts/:id', isAuthenticated, editPost)
app.delete('/api/posts/:id', isAuthenticated, deletePost)

// sequelize.sync({force: true})
sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
}).catch(err => console.error(err))