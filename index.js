const express = require('express')

const app = express()

const entries = [
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
  response.json(entries)
})

app.get('/info', (request, response) => {
  const entriesCount = entries.length
  const date = new Date()
  response.send(`<p>Phonebook has info for ${entriesCount} people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT)