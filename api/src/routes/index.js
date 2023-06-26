const { Router } = require('express');
const { getDogs } = require('../controllers/getDogs')
const { getByIdRaze } = require('../controllers/getByIdRaze')
const { createDog } = require('../controllers/createDog')
const { getTemperaments } = require('../controllers/createTemperaments')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs',(req,res) => {
    getDogs(req,res)
})
router.get('/dogs/:idRaza',(req,res) => {
    getByIdRaze(req,res)
})
router.post('/dogs',(req,res) => {
    createDog(req,res)
})
router.get('/temperaments',(req,res) => {
    getTemperaments(req,res)
})
// router.get('/temperament',(req,res) => {
//     getTemperaments(req,res)
// })


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
