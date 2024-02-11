import {Schema, model} from "mongoose";

const budgetSchema = new Schema({
    budgetName: {type: String, required: true},
    budgetGoal: {type: Number, required: true}

});

const budgetModel = model('Budget', budgetSchema) 

export default budgetModel;