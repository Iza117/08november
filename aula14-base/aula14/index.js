const express = require('express')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajv = new Ajv()
addFormats(ajv)

const app = express()
app.use(express.json())
const port = 3000

let id = 0

const users = []

const userSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
      email: {type: "string", format: "email"},
      password: {type: "string"}
    },
    required: ["name", "email", "password"],
    additionalProperties: false
}

const validateUser = (req, res, next) => {
    const user = req.body
    const validate = ajv.compile(userSchema)
    const valid = validate(user)
    if (valid) {
        next()
    } else {
        res.status(400).json({ msg: "Dados inválidos", errors: validate.errors })
    }
}

app.get('/users', (req, res) => {
    res.json({users:users })
    summary: "Lista todos os usuários"
    responses
      '200'
        description: "Lista de usuários"
        content:
          application/json
            schema:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: integer
                    example: 1
                  name:
                    type: string
                    example: "Tesla da Silva"
                  email:
                    type: string
                    example: "tesla@gmail.com"
})

app.post('/users', validateUser, (req, res) => {
    const user = req.body
    user.id = ++id
    users.push(user)
    res.json({msg: "Usuário adicionado com sucesso."})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})