const pool = require('../config/db');

exports.registrarPartida = async (req, res) => {
  const { jogador1_id, jogador2_id, vencedor_id, jogo, modo } = req.body;

  if (!jogador1_id || !jogador2_id || !vencedor_id || !jogo || !modo)
    return res.status(400).json({ error: 'Dados incompletos.' });

  try {
    await pool.query(
      `INSERT INTO partidas (jogador1_id, jogador2_id, vencedor_id, jogo, modo) VALUES (?, ?, ?, ?, ?)`,
      [jogador1_id, jogador2_id, vencedor_id, jogo, modo]
    );

    res.json({ message: 'Partida registrada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar partida.' });
  }
};
