import { query } from "../config/Db.js";
import { hashPassword, comparePassword } from "../utils/bcryptHelper.js";

const authController = {
  async register(req, res) {
    const { nome, data_nascimento, genero, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ success: false, error: "Required fields" });
    }

    if (senha.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Password must be at least 8 characters",
        });
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Only Gmail addresses are accepted" });
    }

    try {
      const emailExists = await query("SELECT id FROM users WHERE email = $1", [
        email,
      ]);

      if (emailExists.rows.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email already registered" });
      }

      const passwordHash = await hashPassword(senha);

      const result = await query(
        "INSERT INTO users (nome, data_nascimento, genero, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome",
        [nome, data_nascimento, genero, email, passwordHash]
      );

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ success: false, error: "Required fields" });
    }

    try {
      const result = await query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      }

      const user = result.rows[0];
      const validPassword = await comparePassword(senha, user.senha);

      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid password" });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { id: user.id, nome: user.nome },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  },
};

export default authController;
