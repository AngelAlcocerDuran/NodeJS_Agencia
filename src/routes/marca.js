const exp = require('express');
const router = exp.Router();
const pool = require('../database.js');

router.get('/', async(req, res) => {
    let listMarcas = await pool.query('SELECT * FROM marca');

    res.json({
        status: 200,
        message: 'Se encontraron registros',
        listMarcas: listMarcas
    });
});

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    let marca = await pool.query('SELECT * FROM marca WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se encontro el registro',
        marca: marca
    });
});

router.post('/create', async(req, res) => {
    let { nombre } = req.body;
    let marca = { nombre };
    
    await pool.query('INSERT INTO marca SET ?', [marca]);

    res.json({
        status: 200,
        message: 'Se registro correctamente',
        marca: marca
    });
});

router.post('/update/:id', async(req, res) => {
    let { id } = req.params;
    let { nombre } = req.body;
    let marca = { nombre };
    
    await pool.query('UPDATE marca SET ? WHERE id = ?', [marca, id]);

    res.json({
        status: 200,
        message: 'Se modifico correctamente',
        marca: marca
    });
});

router.post('/remove/:id', async(req, res) => {
    let { id } = req.params;
    
    await pool.query('DELETE FROM autos WHERE marca = ?', [id]);
    await pool.query('DELETE FROM marca WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se eliminó correctamente'
    });
});

module.exports = router;