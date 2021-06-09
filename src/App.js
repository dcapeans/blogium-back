import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const posts = [
    {
        id: 1,
        title: 'Hello World',
        coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 2
    },
    {
        id: 2,
        title: 'Post 2',
        coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 4
    }
]

const comments = [
    {
        postId: 1,
        id: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
    }, 
    {
        postId: 1,
        id: 2,
        author: 'Maria',
        content: 'Como faz pra dar palmas?'
    },
    {
        postId: 2,
        id: 1,
        author: 'Pedro',
        content: 'Banana'
    }
]

app.get("/posts", (req, res) => {
    res.send(posts)
})

app.get("/posts/:id", (req, res) => {
    const id = +req.params.id
    const post = findPostById(id)
    res.send(post)
})

app.get("/posts/:id/comments", (req, res) => {
    const id = +req.params.id
    const comments = findComment(id)
    res.send(comments)
})

app.post("/posts/:id/comments", (req, res) => {
    const id = +req.params.id
    const newId = Math.random().toFixed(2)*100
    req.body.postId = id
    req.body.id = newId
    comments.push(req.body)    
})

app.post("/posts", (req, res) => {
    const newId = Math.random().toFixed(2)*100
    req.body.id = newId
    req.body.contentPreview = 'Esta é a estrutura de um post esperado pelo front-end'
    req.body.commentCount = 0
    posts.push(req.body)
})


const findPostById = (reqId) => {
    return posts.find(post => post.id === reqId) 
}

const findComment = (reqId) => {
    return comments.filter(comment => comment.postId === reqId)
}

app.listen(4000, () => {
    console.log("Server listening at port 4000")
})