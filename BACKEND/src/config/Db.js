import { Pool } from "pg"
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export async function query(text, params) {
    try {
        const result = await pool.query(text, params)
        return result
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`)
        throw err
    }
} 
