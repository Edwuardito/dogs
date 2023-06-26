require('dotenv').config();
const axios = require('axios')
const { Dog, Temperament } = require('../db')
const URL = 'https://api.thedogapi.com/v1/breeds'
const { KEY } = process.env
const getTemperaments = async (req,res) => {
    try {
        const { data } = await axios(`${URL}?apiKey=${KEY}`)

        const newData = data.map(el => {
        return  el.temperament
        })

        const arr = []

        for (const el of newData) {
            if(typeof el == 'string'){
                const x = el.split(', ')
                arr.push(x)
            }
        }

        const aux = new Set(arr.flat())
        let x = 1
        const dataArray = []
        const dogSimplified = [...aux]
        for (const el of dogSimplified) {
            dataArray.push({
                id:x++,
                name: el
            })
        }


        return res.status(200).json(dataArray) 

    } catch (error) {
        return res.status(404).send(error.message)
    }
}
module.exports = {
    getTemperaments
}
