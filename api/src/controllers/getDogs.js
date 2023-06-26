require('dotenv').config();
const URL = 'https://api.thedogapi.com/v1/breeds'
const newURL = 'https://api.thedogapi.com/v1/breeds/search?'
const axios = require('axios')
const { KEY } = process.env
const { Temperament, Dog } = require('../db')
const { Op } = require('sequelize');

const getDogs = async (req,res) => {
    try {
        const { name } = req.query
        if(name){
            const searchDtaBase = await Dog.findAll({
                where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }},
                include: {
                    model: Temperament,
                    attributes: ["id","name"],
                    through: {
                      attibutes: []
                    }
                }
            })
            if(searchDtaBase.length){
                const data = searchDtaBase.map(el => {
                    return {
                        id:el.id,
                        image:el.image,
                        name:el.name,
                        height:el.height,
                        weight:el.weight,
                        age:el.age,
                        temperaments:el.Temperaments.map(element => element.name).flat().join(' ')
                        }
                    }
                )

    
                return res.status(200).json(data)
            }

            const { data } = await axios(`${newURL}q=${name}&&apiKey=${KEY}`)
            const deleteData = data.filter(el => el.reference_image_id !== undefined)
            const newData = deleteData.map(el => {
                return {
                    id:el.id,
                    name:el.name,
                    image:`https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
                    height:el.height.metric,
                    weight:el.weight.metric,
                    age:el.life_span,
                    temperaments:el.temperament

                }
            })


            if(!newData.length) throw new Error('nombre no encontrado')
            return res.status(200).json(newData)
        }



///////////////////////////////////////////////////////
        let dataDtaBse = await Dog.findAll({
                include: {
                model: Temperament,
                attributes: ["id","name"],
                through: {
                  attibutes: []
                }
            }
        })
        if(dataDtaBse.length){
            dataDtaBse = dataDtaBse.map(el => {
                return {
                    id:el.id,
                    image:el.image,
                    name:el.name,
                    height:el.height,
                    weight:el.weight,
                    age:el.age,
                    temperaments:el.Temperaments.map(element => element.name).flat().join(' ')
                    }
                }
            )
        }
//////////////////////////////////////////////////////////
        const { data } = await axios(`${URL}?apiKey=${KEY}`)

        const  dataAPI = data.map(el => {return{
            id:el.id,
            name:el.name,
            image:`https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
            height:el.height.metric,
            weight:el.weight.metric,
            age:el.life_span,
            temperaments:el.temperament
        }})

        return res.status(200).json({dataDtaBse,dataAPI})
    }
    catch (error) {
        return res.status(404).send(error.message)
    }
}
module.exports = {
    getDogs
}
