import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import transaction from './models/transactions.js';
import budget from './models/budgets.js';

//Backend port, creation of app
const port = 3000;
const app = express();

//Set up CORS 
app.use(cors());

//Convert JSON string to object for data manipulation on frontend
app.use(express.json());

//Enabling port in express to start listening
app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`)
});

//Get transaction data
app.get('/api/getTransactions', async (req,res)=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactionObject = await transaction.find()
        res.json(transactionObject);
    } catch (error) {
        console.error("Error getting transaction:",error);
    }

});

//Post transaction data
app.post('/api/transaction', async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const {name,desc,date,price,budgetType,budgetIdentifier} = req.body;
        console.log('Received data:', req.body);
        const transactionObject = await transaction.create({name,desc,date,price,budgetType,budgetIdentifier});
        res.json(transactionObject);
    } catch (error) {
        console.error("Error posting transaction:",error);
    }


});

//Delete transaction data
app.delete('/api/deleteTransactions/:id', async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactionID = req.params.id;
        await transaction.findByIdAndDelete(transactionID);
        res.json({success: true, message: `Transaction with ID ${transactionID} successfully removed.`})
    }
    catch(error) {
        console.error("Error deleting transaction:",error);
    }
    
})

//Get Budget Data
app.get('/api/getBudgets', async (req,res)=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const budgetObject = await budget.find();
        res.json(budgetObject);
    } catch (error) {
        console.error("Error getting budget",error);
    }

});

//Post Budget Data
app.post('/api/budget', async (req,res)=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const {budgetName,budgetGoal} = req.body;
        const budgetObject = await budget.create({budgetName,budgetGoal});
        res.json(budgetObject);
    } catch (error) {
        console.error("Error posting budget",error);
    }

})

//Delete object data
app.delete('/api/deleteBudget/:id', async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const budgetID = req.params.id;

        //Delete transactions associated with that budget
        await transaction.deleteMany({budgetIdentifier: budgetID});

        const budgetObject = await budget.findByIdAndDelete(budgetID);
        res.json(budgetObject);
        console.log("Budget deleted successfully")
    }
    catch(error) {
        console.error("Error deleting budget",error);
    }

})

