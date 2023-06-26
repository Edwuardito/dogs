const { Dog, Temperament } = require('../db')
const axios = require('axios')
const URL = 'https://api.thedogapi.com/v1/breeds'
const { KEY } = process.env


const createDog = async (req,res) => {
    ///get temperaments
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
        ///get temperaments
        const searchDtaBase = await Temperament.findAll()
        ////get Temperaments

        const { dog, temperament } = req.body
        const createdDog = await Dog.create(dog)
        
        const temperaments = temperament.map(el =>{
            const x = dataArray.filter(element => element.id == el)
            return x
        }).flat()

 
        let dataTemperaments = false
        for (const el of temperaments) {

            
            const searchTemperaments = searchDtaBase.filter(element => element.id == el.id).length
            if(searchTemperaments == 1) dataTemperaments = true
            else dataTemperaments = false
            

            if(!dataTemperaments){
                const createTemperament = await Temperament.create(el)
            }
        }

        const idTemperaments = temperaments.map(el => el.id)
        await createdDog.addTemperament(idTemperaments)

        return res.status(200).json({res:"ok"})

    } catch (error) {
        return res.status(404).send(error.message)
    }
}
module.exports = {
    createDog
}
