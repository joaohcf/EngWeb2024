import express from 'express';
import mongoose from 'mongoose';

import utilizadoresRouter from './routes/utilizador.js';
import inqueritosRouter from './routes/inquerito.js';

const mongodb_connection = 'mongodb://127.0.0.1/Inqueritos';
mongoose.connect(mongodb_connection);

const database = mongoose.connection;
database.once('open', () => {
    console.log('MongoDB conectada com sucesso.');
});

const app = express();
const port = 4000;

app.use(express.json());

app.use('/utilizadores', utilizadoresRouter);
app.use('/inqueritos', inqueritosRouter);

app.listen(port, () => {
    console.log('Backend API Server listening port ' + port);
})