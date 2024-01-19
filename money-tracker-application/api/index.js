import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import transaction from './models/transactions.js';

const port = 3000;
const app = express();


app.use(cors());
app.use(express.json());


app.get('/api/getTransactions', async (req,res)=> {
    await mongoose.connect(process.env.MONGO_URL);
    const transactionObject = await transaction.find()
    res.json(transactionObject);
});

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`)
});

app.post('/api/transaction', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name,desc,date,price} = req.body;
    const transactionObject = transaction.create({name,desc,date,price});
    res.json(transactionObject);

});


