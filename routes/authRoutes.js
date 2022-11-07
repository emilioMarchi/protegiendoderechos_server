const router = require('express').Router()
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//model
const User = require('../mongoModels/userModel')

//validation model
const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/registrer', async (req, res) => {

    console.log(req.body)

    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
            )
    }
    
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }
    
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({

        email: req.body.email,
        password: encryptedPassword
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})


const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
router.get('/', (req, res) => {
    res.send('holis')
})
router.post('/login', async (req, res) => {
    console.log(req.body)
    
    //validations
    const { error } = schemaLogin.validate(req.body.data);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    //create token
    const token = jwt.sign({
        email:user.email,
        id: user._id
    }, process.env.TOKEN_SECRET)
    res.header({
        'auth-token': token
    })
    res.json({
        error: null,
        data: {token},
        msj:'User logged in'
    })
    res.end()


    
})

module.exports = router
