import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const compositores = await axios('http://localhost:8000/compositores');

        if (compositores.status === 404) return res.status(404).end();

        res.render('compositores.pug', {
            compositores: compositores.data,
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const compositor = await axios.post('http://localhost:8000/compositores', req.body);

        if (compositor.status === 404) return res.status(404).end();

    } catch (e) {
        res.status(500).end();
    }
});

router.get('/create', async (req, res) => {
    try {
        const periodos = await axios('http://localhost:8000/periodos');

        if (periodos.status === 404) return res.status(404).end();

        res.render('compositor_create.pug', {
            periodos: periodos.data,
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id', async (req, res) => {
    try {
        const compositor = await axios('http://localhost:8000/compositores/' + req.params.id);
        if (compositor.status === 404) return res.status(404).end();

        res.render('compositor.pug', {
            compositor: compositor.data,
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/:id', async (req, res) => {
    console.log(req.body)
    
    try {
        const compositor = await axios.put('http://localhost:8000/compositores/' + req.params.id, req.body);

        if (compositor.status === 404) return res.status(404).end();

        res.redirect('/compositores/' + req.params.id);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        const compositor = await axios.delete('http://localhost:8000/compositores/' + req.params.id);

        if (compositor.status === 404) return res.status(404).end();

        res.redirect('/compositores');
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const compositor = await axios.get('http://localhost:8000/compositores/' + req.params.id);
        const periodos = await axios.get('http://localhost:8000/periodos');

        if (periodos.status === 404) return res.status(404).end();

        res.render('compositor_edit.pug', {
            compositor: compositor.data,
            periodos: periodos.data
        });
    } catch (e) {
        res.status(500).end();
    }
});

export default router;