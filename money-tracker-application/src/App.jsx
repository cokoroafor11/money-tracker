import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name,setName] = useState('');
  const [date,setDate] = useState('');
  const [desc,setDesc] = useState('');
  const [price,setPrice] = useState('');
  const [transactions,setTransactions] = useState([])

  async function addNewTransaction(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL+'/transaction';
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name,date,desc,price})
    }).then(response => {
      setName('');
      setDate('');
      setDesc('');
      setPrice('');
      console.log('result', response);
      return response.json();
  }).then(data => {
    console.log('json data', data);
    getTransactions().then(setTransactions);
  }).catch(error => {
    console.error('Error:', error);
  });
  }

  useEffect(() => {
    getTransactions().then(setTransactions)
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
  
  const totalBalance = () => {
    let sum = 0;
    transactions.forEach(num => {
      sum+=num.price;
    });
    return sum;
  }
  
  return (
    <div>
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
              <input type = "text" id = "name" value = {name} onChange={e =>setName(e.target.value)} placeholder = "New Apple Watch"/>
            </div>
            <div className="grid-right">
              <label>Date</label>
              <input type = "date" id = "date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

          </div>
          <div className='description'>
            <label>Description</label>
            <input type = "Description" id="description" value={desc} onChange={e=> setDesc(e.target.value)} placeholder = "My last watch broke"/>
            <label>Price</label>
            <input type = "number" id = "price" value={price} onChange={e=> setPrice(e.target.value)} placeholder="$121.76" step="any"/>
          </div>
          <button type = "submit">Add Transaction</button>
        </div>
      </form>
      {transactions.map((transaction) => {
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
          </div>
          </div>
        );
      })}
  </div>
  )
}

export default App
