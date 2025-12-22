import { query } from "../config/Db.js";

const homeController = {
    home: async (req, res) => {
        const id = req.params.id
        console.log(`id recebido: ${id}`)

        try {
            const result = await query('SELECT * FROM users WHERE id = $1', [id])
            if (result.rows.length === 0) {
                return res.status(404).send('User not found')
            }

            const user = result.rows[0]
          

            return res.render('home', { user })

        } catch (err) {
            console.error(`Error searching user ${err}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default homeController