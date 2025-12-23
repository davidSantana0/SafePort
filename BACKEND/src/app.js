import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { create } from "express-handlebars";
import routes from "./routes/route.js";
import { query } from "./config/Db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  })
);

// Handlebars
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layout"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Rotas
app.use(routes);

// Teste de conexão com DB
async function connectDB() {
  try {
    await query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error", err);
  }
}

connectDB();

export default app;
