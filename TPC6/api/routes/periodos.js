import express from 'express';
import periodo from "../controllers/periodo.js";
import compositor from "../controllers/compositor.js";

const router = express.Router();

router.get('/', (req, res) => {
    periodo.read_all()
        .then(data => res.jsonp(data))
        .catch(error => res.jsonp(error));
});

router.post('/', (req, res) => {
    periodo.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(error => res.jsonp(error));
});

router.get('/:id', (req, res) => {
    periodo.read(req.params.id)
        .then(data => res.jsonp(data))
        .catch(error => res.jsonp(error));
});

router.put('/:id', (req, res) => {
    periodo.update(req.params.id, req.body)
        .then(() => res.sendStatus(201))
        .catch(error => res.jsonp(error));
});

router.delete('/:id', async (req, res) => {
    try {
        await compositor.remove_by_periodo(req.params.id.toString());
        await periodo.remove(req.params.id.toString());
        res.sendStatus(201);
    } catch (error) {
        res.jsonp(error);
    }
});

export default router;