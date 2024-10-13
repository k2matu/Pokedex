const userRouter = require('express').Router()

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

userRouter.get('/', (req, res) => {
	res.json(users)
})

userRouter.get('/:name', (req, res) => {
	const name = req.params.name
	const user = users.find(user => user.name === name)
	
	if (user) {
		res.json(user)
	} else {
		res.status(404).end()
	}
})

userRouter.delete('/:name', (req, res) => {
	const name = req.params.name
	users = users.filter(user => user.name !== name)
	
	res.status(204).end()
})

userRouter.post('/', (req, res) => {
	const user = req.body
	
	if (!user.name) {
		return res.status(400).json({ 
			error: 'name missing'
		})
	}
	
	if (!user.password) {
		return res.status(400).json({ 
			error: 'password missing'
		})
	}
	
	console.log(user)
	users = users.concat(user)
	
	res.json(user)
})

module.exports = userRouter