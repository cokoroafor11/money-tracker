import { useState, useEffect } from 'react'
import '../styles/Transaction.css'
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiNoteEditOutline } from '@mdi/js';


function Transaction() {
    const [name,setName] = useState('');
    const [date,setDate] = useState('');
    const [desc,setDesc] = useState('');
    const [price,setPrice] = useState('');
    const [budgetType, setBudgetType] = useState('');
    const [budgetIdentifier, setBudgetIdentifier] = useState('');
    const [transactions,setTransactions] = useState([]);

    const [buttonFlag, setButtonFlag] = useState('Income');
    const [type,setType] = useState('');

    const [budgets,setBudgets] = useState([]);
    
    async function addNewTransaction(e) {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL+'/transaction';
        fetch(url, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
            name,date,
            desc,price,
            budgetType,
            budgetIdentifier})
        }).then(response => {
        setName('');
        setDate('');
        setDesc('');
        setPrice('');
        setBudgetType('');
        setBudgetIdentifier('');
        console.log('result', response);
        return response.json();
    }).then(data => {
        console.log('json data', data);
        getTransactions().then(setTransactions);
    }).catch(error => {
        console.error('Error:', error);
    });
    }
    
    //trigger the fetching of data when component is mounted
    useEffect(() => {
        getTransactions().then(setTransactions)
        getBudgets().then(setBudgets)
    }, [])

    async function getTransactions() {
        const url = import.meta.env.VITE_API_URL+'/getTransactions';
        const response = await fetch(url);
        const data = await response.json();
        const parsedTransactions =  data.map(transaction => ({
        ...transaction,
        price: parseFloat(transaction.price)
        }));
        return parsedTransactions;
    }

    async function deleteTransactions(transactionID) {
        const url = `${import.meta.env.VITE_API_URL}/deleteTransactions/${transactionID}`;

        const deleteConfirmation = window.confirm("Do you really want to delete this entry?")
        if (deleteConfirmation===true) {
            await fetch(url, {method: 'DELETE'});
            const updatedTransactions = await getTransactions();
            setTransactions(updatedTransactions);
        }
    }

    //Get budgets
    async function getBudgets(e) {
        const url = import.meta.env.VITE_API_URL+'/getBudgets';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    function handleBudgetSelect(budget) {
        const [type,ID] = budget.split('|');
        setBudgetIdentifier(ID);
        setBudgetType(type);

    }

    
    const totalBalance = () => {
        let sum = 0;
        transactions.forEach(num => {
        sum+=num.price;
        });
        return (Math.round(sum * 100) / 100).toFixed(2);
    }
  
    return (
        <div className="transact-body">
            
                <div className="left-body">
                    <div className = 'headers'>
                        <h1>Balance</h1>
                        <div className="info">
                            <h3>Current Balance: <span style={{ color: totalBalance() >= 0 ? 'lightgreen' : 'red' }}>${totalBalance()}</span></h3>
                            <p>Total Transactions: {transactions.length}</p>
                        </div>
                        <div className="searchBar">
                        </div>
                    </div>
                    <form onSubmit = {addNewTransaction}>
                        <div>
                        <div className='basicInfo'>
                            <div className="grid-left">
                            <label>Transaction</label>
                            <input type = "text" id = "name" value = {name} onChange={e =>setName(e.target.value)} placeholder = "New Apple Watch" required/>
                            </div>
                            <div className="grid-right">
                            <label>Date</label>
                            <input type = "date" id = "date" value={date} onChange={e => setDate(e.target.value)} required/>
                            </div>

                        </div>
                        <div className='description'>
                            <label>Description</label>
                            <input type = "Description" id="description" value={desc} onChange={e=> setDesc(e.target.value)} placeholder = "My last watch broke"/>
                            <label>Price</label>
                            <input type = "number" id = "price" value={price} onChange={e=> setPrice(e.target.value)} placeholder="$121.76" step="any" required/>
                        </div>
                        <div className="budget-selector">
                            <select value={`${budgetType}|${budgetIdentifier}`} onChange={(e) => handleBudgetSelect(e.target.value)} required>
                                <option value="">Select a budget</option>
                                {budgets.map((budget) => (
                                    <option key={budget._id} value={`${budget.budgetName}|${budget._id}`}>
                                        {budget.budgetName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="buttons">
                            
                            <button type = "submit">Add Transaction</button>
                        </div>

                        </div>
                    </form>
                </div>
                <div className="right-body">
                    <h2>Recent Transactions</h2>
                    {transactions.slice(0,5).map((transaction) => {
                        const formattedDate = new Date(transaction.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        
                        return (
                        <div className="transactions" key={transaction._id}>
                            <div className="left">
                                <div className="name">{transaction.name}</div>
                                <div className="description">{transaction.desc}</div>
                            </div>
                            <div className="right">
                                <div className="price"><span style={{ color: transaction.price >= 0 ? 'lightgreen' : 'red' }}>${transaction.price}</span></div>
                                <div className="datetime">{formattedDate}</div>
                                <Icon className="edit-delete" path={mdiTrashCanOutline} size={0.7} onClick = {() => deleteTransactions(transaction._id)} />
                                <Icon className="edit-delete"path={mdiNoteEditOutline} size={0.7} />
                            </div>
                        </div>
                        );
                    })}
                </div>

        

        </div>
    )
}

export default Transaction;