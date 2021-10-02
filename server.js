const http = require('http')
const express = require('express')
const data = require('./data')


const hostname = '127.0.0.1';
const port = 3000;

const app = express()

const server = http.createServer(app)

app.get("/favicon.ico", (req, res) => {
    res.send("")
})

app.get('/', (req, res) => {
    // set up html string, start with ul
    let html = '<ul>'
    // for each iteem in the data array
    for (let i = 0; i < data.length; i++){
        // add more html (li & a tags) to the html string
        html += `<li><a href="/${data[i].handle}">${data[i].name}</a></li>`
    }
    // finish with the closing ul tag
    html += '</ul>'
    // send back a response with thee build html string
    res.send(html)
})

app.get('/cats', (req, res) => {
    res.send('<h1>"Meow!"</h1>')
})

app.get('/dogs', (req, res) => {
    res.send('<h1>"Woof!"</h1>')
})

app.get('/cats_and_dogs', (req, res) => {
    res.send('<h1>"Dogs and cats living together...mass hysteria!"</h1>')
})

app.get('/greet/:name', (req, res) => {
    const {name} = req.params;    
    res.send(`<h1>Hello ${name}!</h1>`)
})

app.get('/:handle', (req, res) => {
    //find method takes a function which recieves one item at a time
    const food = data.find((profile) => {
        // when we return true, stop looking bc we've found the item
        //if current profile's "handle" property has same value as
        //the one in the "handle" param that is in the url, return true
        return profile.handle === req.params.handle
    })
    // if we weree not able to find a food in the data
    if (!food) {
        // set the status to 404, and send back error message
        res.status(404).send('Could not find that food')
    } else {
        //otherwise, send back the "profile html" for the food
    res.send(`<h1>${food.name}</h1><h4>${food.handle}</h4>`)
    }
})

app.get('*', (req, res) => {
    res.status(404)
    res.send('Page Not Found')
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})