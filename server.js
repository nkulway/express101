const http = require('http')
const express = require('express')
const data = require('./data')

const hostname = '127.0.0.1';
const port = 3000;

const app = express()

const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/:handle', (req, res) => {
    console.log(req.params.handle)
    res.send('hello')
})

app.get('*', (req, res) => {
    res.status(404)
    res.send('Page Not Found')
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})