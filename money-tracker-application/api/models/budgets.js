import {Schema, model} from "mongoose";
const budgetSchema = new Schema({
    budgetName: {type: String, required: true},
    budgetMax: {type: Number, required: true}

});

const transactionModel = model('Transaction', transactionSchema) 

export default transactionModel;