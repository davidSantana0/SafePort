import route from './routes/routeUser.js'
import { engine, create } from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import { query } from './config/Db.js'
import express from 'express'
import cors from 'cors'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  credentials: true
}))

app.use(route)

const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layout'),
  helpers: {
    json: (context) => JSON.stringify(context, null, 2)
  }
})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))


async function connectingDB() {
  try {
    await query('SELECT NOW()')
    console.log("Connected Database")
  } catch (err) {
    console.log("Error connecting to Database", err)

  }
}

connectingDB()


export default app
