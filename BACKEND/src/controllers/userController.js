import { query } from "../config/Db.js";

const userController = {
  async home(req, res) {
    const { id } = req.params;

    try {
      const result = await query("SELECT id, nome FROM users WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).send("User not found");
      }

      return res.render("home", { user: result.rows[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  },
};

export default userController;
