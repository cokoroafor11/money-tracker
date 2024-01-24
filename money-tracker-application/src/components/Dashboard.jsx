import { useState, useEffect } from 'react'
import '../styles/Dashboard.css';

function Dashboard() {
    const [transactions, setTransactions] = useState([])

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
    //trigger the fetching of data when component is mounted
    useEffect(() => {
        getTransactions().then(setTransactions)
      }, [])

    function getBalance(transactions) {
        let sum = 0;
        transactions.forEach(num => {
          sum+=num.price;
        });
        return sum;
      }

    const income = () => {
        let incomes = transactions.filter((transaction) => transaction.price>=0);

        incomes = incomes.map((income)=>{return (income.price)});
        let totalInc = getBalance(incomes);
        let minInc = Math.min(...incomes);
        let maxInc = Math.max(...incomes);
        return [totalInc,minInc,maxInc];
    }
    
    const [totalIncome,minIncome,maxIncome] = income();

    const expense = () => {
        let expenses = transactions.filter((transaction) => transaction.price<0);
        expenses = expenses.map((expense)=>{return (expense.price)});
        
        let totalExp = getBalance(expenses);
        let minExp = Math.min(...expenses);
        let maxExp = Math.max(...expenses);
        return [totalExp,minExp,maxExp];
    }

    const [totalExpense,minExpense,maxExpense] = expense();

    return (
        <div>
            <div className="chart">
                <h1>Expense Chart</h1>
                <p>Hello</p>
            </div>

            <div className="other-info">
                <div className="expense-info">
                    <h2>Recent Transactions</h2>
                    {transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 3).map((transaction) => {
                        return (
                            <div className="recent-transaction" key = {transaction._id} style = {{ color: transaction.price >= 0 ? 'lightgreen' : 'red' }}>
                                <p>{transaction.name}</p>
                                <p>${transaction.price}</p>
                            </div>
                        )
                    })}
                    
                </div>
                
                <div className="range-group">
                    <div className="range-titles">
                        <p>Min</p>
                        <h2>Income</h2>
                        <p>Max</p>
                    </div>
                    <div className="income-range">
                        <p>${minIncome}</p>
                        <p>${maxIncome}</p>
                    </div>
                </div>

                <div className="range-group">
                    <div className="range-titles">
                        <p>Min</p>
                        <h2>Expense</h2>
                        <p>Max</p>
                    </div>
                    <div className="expense-range">
                        <p>${minExpense}</p>
                        <p>${maxExpense}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
