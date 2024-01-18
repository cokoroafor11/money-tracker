import { useState } from 'react'
import './App.css'

function App() {
  const [name,setName] = useState('');
  const [date,setDate] = useState('');
  const [desc,setDesc] = useState('');
  const [price,setPrice] = useState('');

  async function addNewTransaction(e) {
    e.preventDefault();
    // const url = REACT_APP_API_URL;
    //const url = REACT_APP_HELLO;
    const url = import.meta.env.VITE_API_URL+'/transaction';
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name,date,desc,price})
    }).then(response => {
      console.log('result', response);
        return response.json();
  }).then(data => {
    console.log('json data', data);
  }).catch(error => {
    console.error('Error:', error);
  });
  }
  return (
    <div>
      <h1>Balance</h1>
      <h2>Current Balance: $400</h2>
      <form onSubmit = {addNewTransaction}>
        <div>
          <div className='basicInfo'>
            <div className="grid-left">
              <label>Transaction</label>
              <input type = "text" id = "name" value = {name} onChange={e =>setName(e.target.value)} placeholder = "New Apple Watch"/>
            </div>
            <div className="grid-right">
              <label>Date</label>
              <input type = "datetime-local" id = "date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

          </div>

          <div className='description'>
            <label>Description</label>
            <input type = "Description" id="description" value={desc} onChange={e=> setDesc(e.target.value)} placeholder = "My last watch broke"/>
            <label>Price</label>
            <input type = "number" id = "price" value={price} onChange={e=> setPrice(e.target.value)} placeholder="$121.76" min="1" step="any"/>
          </div>
          <button type = "submit">Add Transaction</button>
        </div>
      </form>
      <div className="transactions">
            <div className="left">
              <div className="name">New house babbyyy</div>
              <div className="description">I needed a new tv</div>
            </div>
            <div className="right">
              <div className="price">$25</div>
              <div className="datetime">12/22/2023 9:35</div>
            </div>
      </div>

      <div className="transactions">
            <div className="left">
              <div className="name">TV stand</div>
              <div className="description">I needed a new tv</div>
            </div>
            <div className="right">
              <div className="price">$25</div>
              <div className="datetime">12/22/2023 9:35</div>
            </div>
      </div>
  </div>
  )
}

export default App
