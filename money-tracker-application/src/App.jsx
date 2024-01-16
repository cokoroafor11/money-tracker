import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
    <h1>Balance</h1>
    <form>
      <div>
        <div className='basicInfo'>
          <label for="itemName">Transaction</label>
          <input type = "text" placeholder = "New Apple Watch"/>
          <label for="date">Date</label>
          <input type = "datetime-local"/>
        </div>

        <div className='description'>
          <label for="description">Description</label>
          <input type = "Description" placeholder = "My last watch broke"/>
          <label for="price">Price</label>
          <input type = "number" min="1" step="any"/>
        </div>
        <button type = "submit">Add New transactions</button>
        <div className="transactions">
          <div className="left">
            
          </div>
        </div>
      </div>
    </form>
  </>
  )
}

export default App
