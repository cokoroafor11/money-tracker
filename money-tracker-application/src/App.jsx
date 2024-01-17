import { useState } from 'react'
import './App.css'

function App() {
  const [name,setName] = useState('');
  const [date,setDate] = useState('');
  const [desc,setDesc] = useState('');
  const [price,setPrice] = useState('');

  function addNewTransaction() {
    const url = ''
    fetch(url)
  }
  return (
    <body>
      <h1>Balance</h1>
      <form onSubmit = {AddNewTransaction}>
        <div>
          <div className='basicInfo'>
            <div className="grid-left">
              <label for="itemName">Transaction</label>
              <input type = "text" value = {name} onChange={e =>setName(e.target.value)} placeholder = "New Apple Watch"/>
            </div>
            <div className="grid-right">
              <label for="date">Date</label>
              <input type = "datetime-local" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

          </div>

          <div className='description'>
            <label for="description">Description</label>
            <input type = "Description" value={desc} onChange={e=> setDesc(e.target.value)} placeholder = "My last watch broke"/>
            <label for="price">Price</label>
            <input type = "number" value={price} onChange={e=> setPrice(e.target.value)} placeholder="$121.76" min="1" step="any"/>
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
  </body>
  )
}

export default App
