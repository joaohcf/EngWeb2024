import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const periodos = await axios('http://localhost:8000/periodos?_sort=periodo');

        if (periodos.status === 404) return res.status(404).end();

        res.render('periodos.pug', {
            periodos: periodos.data,
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const periodo = await axios.post('http://localhost:8000/periodos', req.body);

        if (periodo.status === 404) return res.status(404).end();

        res.redirect('/periodos/');
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/create', async (req, res) => {
    try {
        res.render('periodo_create.pug');
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id', async (req, res) => {
    try {
        const periodo = await axios('http://localhost:8000/periodos/' + req.params.id);
        const compositores = await axios('http://localhost:8000/compositores?id_periodo=' + req.params.id);

        if (periodo.status === 404 || compositores.status === 404) return res.status(404).end();

        res.render('periodo.pug', {
            periodo: periodo.data,
            compositores: compositores.data,
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/:id', async (req, res) => {
    try {
        const periodo = await axios.put('http://localhost:8000/periodos/' + req.params.id, req.body);

        if (periodo.status === 404) return res.status(404).end();

        res.redirect('/periodos/' + req.params.id);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        const periodo = await axios.delete('http://localhost:8000/periodos/' + req.params.id);

        if (periodo.status === 404) return res.status(404).end();

        res.redirect('/periodos');
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const periodo = await axios.get('http://localhost:8000/periodos/' + req.params.id);

        if (periodo.status === 404) return res.status(404).end();

        res.render('periodo_edit.pug', {
            periodo: periodo.data
        });
    } catch (e) {
        res.status(500).end();
    }
});

export default router;