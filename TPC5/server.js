import express from 'express';
import compositores from './routes/compositores.js';
import periodos from './routes/periodos.js';

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));

app.get('/', (_, res) => {
    res.redirect('/compositores');
});

app.use('/compositores', compositores);
app.use('/periodos', periodos);

app.use(express.static('css'))

app.listen(port, () => {
    console.log('Server listening - port ' + port)
});