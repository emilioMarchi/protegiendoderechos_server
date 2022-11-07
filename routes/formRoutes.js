const router = require('express').Router()
const FormQuery = require('../mongoModels/formModel')
const connectDb = require('../mongoConnection')

router.get('/formQueryes', async (req,res) => {
    const queryes = await FormQuery.find()
    res.send(queryes)
})

router.post('/contact', async (req,res) => {
    try{
        

        const {userName, userEmail, userQuery} = req.body
        const newQuery = new FormQuery({
            userName,
            userEmail,
            userQuery,
            queryDate: new Date()
        })
        await FormQuery.create(newQuery)
   
        res.json({state:'staisfactory', msj:'Su consulta fue enviada con éxito'})
    }
    catch{
        console.log('error')
        res.status(400)
        res.json({state:'negative', msj:'Hubo un error, vuelva a intentarlo'})
    }
})

module.exports=router