const mongoose = require('mongoose')

const uri = `mongodb+srv://tpcagencia:${process.env.MG_PASSWORD}@cluster0.d4qubf2.mongodb.net/?retryWrites=true&w=majority`;
const connectDb = async ()=>{ 
    await mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
}

module.exports=connectDb