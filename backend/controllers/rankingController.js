const pool = require('../config/db');

exports.getRanking = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.nome, COUNT(*) AS vitorias
      FROM partidas p
      JOIN usuarios u ON p.vencedor_id = u.id
      GROUP BY u.nome
      ORDER BY vitorias DESC
      LIMIT 20
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar ranking.' });
  }
};
