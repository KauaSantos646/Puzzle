const express = require('express');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jogosRoutes = require('./routes/jogos');
const rankingRoutes = require('./routes/ranking');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jogos', jogosRoutes);
app.use('/api/ranking', rankingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
