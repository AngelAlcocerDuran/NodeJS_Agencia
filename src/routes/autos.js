const exp = require('express');
const router = exp.Router();
const pool = require('../database.js');

router.get('/', async(req, res) => {
    let listAutos = await pool.query('SELECT * FROM autos');

    res.json({
        status: 200,
        message: 'Se encontraron registros',
        listAutos: listAutos
    });
});

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    let autos = await pool.query('SELECT * FROM autos WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se encontro el registro',
        autos: autos
    });
});

router.post('/create', async(req, res) => {
    let { nombre, matricula, adv, marca } = req.body;
    let now = new Date();

    let d = now.getDate();
    let m = now.getMonth() + 1;
    let y = now.getFullYear();
    let registered = y+'-'+m+'-'+d;
    let estado = 1;

    let auto = { nombre, matricula, adv, registered, estado, marca };
    
    await pool.query('INSERT INTO autos SET ?', [auto]);

    res.json({
        status: 200,
        message: 'Se registro correctamente',
        auto: auto
    });
});

router.post('/update/:id', async(req, res) => {
    let { id } = req.params;
    let { nombre, matricula, adv, marca } = req.body;
    let now = new Date();

    let d = now.getDate();
    let m = now.getMonth() + 1;
    let y = now.getFullYear();
    let updated = y+'-'+m+'-'+d;
    let estado = 1;

    let auto = { nombre, matricula, adv, updated, estado, marca };
    
    await pool.query('UPDATE autos SET ? WHERE id = ?', [auto, id]);

    res.json({
        status: 200,
        message: 'Se modifico correctamente',
        auto: auto
    });
});

router.post('/remove/:id', async(req, res) => {
    let { id } = req.params;
    
    await pool.query('UPDATE autos SET estado = 0 WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se elimino correctamente'
    });
});

module.exports = router;