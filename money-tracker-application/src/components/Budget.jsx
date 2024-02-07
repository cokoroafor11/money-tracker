import { useState, useEffect } from 'react'
import '../styles/Budget.css'
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiNoteEditOutline } from '@mdi/js';
function Budget() {

    //Budget info
    const [budgetName,setBudgetName] = useState('');
    const [budgetGoal,setbudgetGoal] = useState('');
    const [budgets,setBudgets] = useState([]);

    //Add new budget
    async function addNewBudget(e) {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL+'/budget';
        fetch (url, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({budgetName,budgetGoal})
        }).then(response => {
            setBudgetName('');
            setbudgetGoal('');
            console.log('result',response);
            return response.json();
        }).then(data => {
            console.log('json data', data);
            getBudgets().then(setBudgets);
        }).catch(error => {
            console.error('Error:', error);
        });
    }
    
    
    //Get budgets
    async function getBudgets(e) {
        const url = import.meta.env.VITE_API_URL+'/getBudgets';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    //Delete budget
    async function deleteBudget(BudgetID) {
        const url = `${import.meta.env.VITE_API_URL}/deleteBudget/${BudgetID}`;

        const deleteConfirmation = window.confirm("Do you really want to delete this entry?")
        if (deleteConfirmation===true) {
            try {
                await fetch(url, {method: 'DELETE'});
                const updatedBudgets = await getBudgets();
                setBudgets(updatedBudgets);
            } catch (error) {
                console.log('There was an error:', error)
            }

        }
    }
    useEffect(() => {
        getBudgets().then(setBudgets);

    }, [])

    return  (
        <div className="budget-body">
            <div className="left-body">
                <div className = 'headers'>
                    <h1> Budgets</h1>
                    {/* <div className="info">
                        <h3>Existing Budgets</h3>
                        <p>{budgets.length}</p>
                    </div> */}
                    <div className="searchBar">
                    </div>
                </div>
                <form onSubmit = {addNewBudget}>
                    <div>
                    <div className='budget'>
                        <label>Budget Name</label>
                        <input type = "text" id="budgetName" value={budgetName} onChange={e=> setBudgetName(e.target.value)} placeholder = "Groceries" required/>
                        <label>Budget Amount</label>
                        <input type = "number" id = "budgetAmt" value={budgetGoal} onChange={e=> setbudgetGoal(e.target.value)} placeholder="$900" step="1" min="0" required/>
                    </div>
                    <div className="buttons">
                        
                        <button type = "submit">Add Budget</button>
                    </div>

                    </div>
                </form>
            </div>
            <div className="right-body">
                <div className="existing-budgets">
                    <h2>Existing Budgets</h2>
                    <p>{budgets.length}</p>
                </div>
                {budgets.map((budget => {
                    return (
                        <div className="budget-view" key={budget._id}>
                            <div className="title-price">
                                <p>{budget.budgetName}</p>
                                <p>${budget.budgetGoal} Budgeted</p>
                            </div>
                            <div className="progress-bar">
                                <p>Progress Bar</p>
                            </div>
                            <div className="budget-buttons">
                                <button>Details</button>
                                <div className="modify">
                                    <Icon className="edit-delete" path={mdiTrashCanOutline} size={0.7} onClick = {() => deleteBudget(budget._id)} />
                                    <Icon className="edit-delete"path={mdiNoteEditOutline} size={0.7} />
                                </div>
                            </div>
                        </div>
                    )
                }))}

            </div>
        </div>

    )
}

export default Budget;