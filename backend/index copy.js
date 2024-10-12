const express = require('express')
const app = express()

let users = [
  {
    id: "1",
    name: "name1",
    password: "secret"
  },
  {
    id: "2",
    name: "name2",
    password: "secret"
  },
	{
    id: "3",
    name: "name3",
    password: "secret"
  }
]

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>')
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:name', (req, res) => {
	const name = req.params.name
	const user = users.find(user => user.name === name)
	
	if (user) {
		res.json(user)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/users/:name', (req, res) => {
	const name = req.params.name
	users = users.filter(user => user.name !== name)
	
	res.status(204).end()
})

app.post('/api/users', (req, res) => {
	const user = req.body
	
	if (!body.name) {
		return res.status(400).json({ 
			error: 'name missing'
		})
	}
	
	if (!body.password) {
		return res.status(400).json({ 
			error: 'password missing'
		})
	}
	
	console.log(user)
	users = users.concat(user)
	
	res.json(user)
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)