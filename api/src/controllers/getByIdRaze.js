require('dotenv').config();
const URL = 'https://api.thedogapi.com/v1/breeds/search?'
const axios = require('axios')
const { KEY } = process.env
const { Temperament, Dog } = require('../db')


const getByIdRaze = async (req,res) => {
    try {
        const { idRaza } = req.params
        const searchDtaBase = await Dog.findAll({
            where:{
                name:idRaza
            },
            include: {
                model: Temperament,
                attributes: ["name"]
            }
        })
        if(searchDtaBase.length){
            const aux = searchDtaBase
            const temperament = aux.map(el => {
                return el.Temperaments.map(element => element.name)
            })
            const data = {
                id:searchDtaBase[0].id,
                image:searchDtaBase[0].image,
                name:searchDtaBase[0].name,
                height:searchDtaBase[0].height,
                weight:searchDtaBase[0].weight,
                age:searchDtaBase[0].age,
                temperaments:temperament.flat().join(' ')
            }

            return res.status(200).json({res:data})
        }
        const { data } = await axios(`${URL}q=${idRaza}&&apiKey=${KEY}`)
        if(!data.length) throw new Error('no se encontraron datos sobre el perro indicado')
        const aux = data.shift()
        const newData = {
                id:aux.id,
                image:`https://cdn2.thedogapi.com/images/${aux.reference_image_id}.jpg`,
                name:aux.name,
                height:aux.height.metric,
                weight:aux.weight.metric,
                age:aux.life_span,
                temperament:aux.temperament
        }
        return res.status(200).json({newData})
    }
    catch (error) {
        return res.status(404).send(error.message)
    }
}
module.exports = {
    getByIdRaze
}