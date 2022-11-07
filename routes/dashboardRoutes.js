const router = require('express').Router()
const FormQuery = require('../mongoModels/formModel')

router.get('/formQueryes', async (req,res) => {
    const queryes = await FormQuery.find()
    res.send(queryes)
})

module.exports=router