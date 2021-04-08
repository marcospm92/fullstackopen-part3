const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('data', function getData (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const personsCount = persons.length
  const date = new Date()
  response.send(`<p>Phonebook has info for ${personsCount} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }

  if (!person.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  if (persons.some(p => p.name === person.name) === true) {
    return response.status(400).json({
      error: 'Name already exists'
    })
  }

  const getRandomId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const newPerson = {
    id: getRandomId(0, 1000),
    name: person.name,
    number: person.number
  }

  persons = [...persons, newPerson]
  response.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
