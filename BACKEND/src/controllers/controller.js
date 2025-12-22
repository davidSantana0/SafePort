import { query } from "../config/Db.js"
import { kryptoPassword, comparePassword } from "../utils/bcryptHelper.js"

const authControler = {
    register: async (req, res) => {

        const { nome, data_nascimento, genero, email, senha } = req.body
        const passwordHash = await kryptoPassword(senha)

        // console.log(`Password: ${senha}`)
        // console.log(`Password hash: ${passwordHash}`)


        const regexGmail = /^[a-zA-Z]{4,}[^\s@]*@gmail\.com$/i
        const isGmail = regexGmail.test(email)

        const homeEmail = email.split('@')[0]
        const regexHome = /^[a-zA-Z]{4,}/

        // Validations fields
        if (!nome || !senha) {
            return res.status(400).json(
                {
                    success: false, error: 'Required fields'
                }
            )
        }


        if (!isGmail) {
            return res.status(400).json(
                {
                    success: false, error: 'Only Gmail addresses are accepted'
                }
            )
        }

        if (!regexHome.test(homeEmail)) {
            return res.status(400).json(
                {
                    success: false, error: 'The beginning must have at least 4 letters'
                }
            )
        }


        try {
            // Database query
            const checkEmail = await query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            )
            const RegisteringEmail = checkEmail.rows

            if (RegisteringEmail.length > 0) {
                return res.status(400).json(
                    {
                        success: false, error: 'Email already registered'
                    }
                )
            }
            // User registration
            const result = await query(
                'INSERT INTO users (nome, data_nascimento, genero, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome',
                [nome, data_nascimento, genero, email, passwordHash]
            )

            const newUser = result.rows[0]

            return res.status(201).json(
                {
                    success: true,
                    message: 'User registered successfully',
                    user: {
                        id: newUser.id,
                        nome: newUser.nome
                    }
                })

        } catch (err) {
            console.log(`Internal server error: ${err}`)
            return res.status(500).json(
                {
                    success: false, error: 'Server failure'
                }
            )
        }

    },

    //User Login 
    login: async (req, res) => {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ success: false, error: 'Required fields, fill in to log in' })
        }

        try {
            const checkEmail = await query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            )

            if (checkEmail.rows.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found'
                })
            }

            const user = checkEmail.rows[0]
            const passwordHash = user.senha
            
            // console.log(`email: ${email}`)
            // console.log(`Senha digitada: ${senha}`)
            // console.log(`Senha hash: ${passwordHash}`)

            const passwordValid = await comparePassword(senha, passwordHash)

            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    error: 'Incorrect password, check your password'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    nome: user.nome
                }
            })

        } catch (err) {
            console.log(`Error internal server: ${err}`)
            return res.status(500).json({
                success: false,
                error: "Server failure"
            })
        }
    }

}

export default authControler