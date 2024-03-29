import {Schema, model} from "mongoose";
const transactionSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: Number, required: true},
    budgetType: {type: String, required: true},
    budgetIdentifier: { type: String, required: true }
});

const transactionModel = model('Transaction', transactionSchema) 

export default transactionModel;