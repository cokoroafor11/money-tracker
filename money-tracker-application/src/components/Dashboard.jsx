import { useState, useEffect } from 'react'
import '../styles/Dashboard.css';
import BarPlot from './BarChart';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import ReactPaginate from 'react-paginate';


function Dashboard() {
    //Hook for transactions array
    const [transactions, setTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5;
    const startInd = currentPage*perPage;
    const endInd = startInd + perPage;

    //Loader function for transactions
    async function getTransactions(page) {
        const url = import.meta.env.VITE_API_URL+`/getTransactions?page=${page}`;
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
        getTransactions(currentPage).then(setTransactions)
      }, [currentPage])

    function pageChange(clickedPage) {
        setCurrentPage(clickedPage.selected);
    }

    //trigger the auth state - check if user is signed in or out
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUID = user.uid;
                console.log("uid", userUID);
            } else {
                console.log("User is logged out.")
            }
        })
    })

    //Get total balance
    function getBalance(transactions) {
        let sum = 0;
        transactions.forEach(num => {
          sum+=num.price;
        });
        return sum;
      }

    //Get income balances
    const income = () => {
        let incomes = transactions.filter((transaction) => transaction.price>=0);

        incomes = incomes.map((income)=>{return (income.price)});
        let totalInc = getBalance(incomes);
        let minInc = Math.min(...incomes);
        let maxInc = Math.max(...incomes);
        return [totalInc,minInc,maxInc];
    }
    
    
    const [totalIncome,minIncome,maxIncome] = income();

    //Get expense balances
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
        <div className="dash-body">
        <div className = "dash">
            <div className="chart">
                <h1>Expense Chart</h1>
                <BarPlot/>
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
            </div>
        </div>
        <div className="table">
            <h2>Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.slice(startInd,endInd).map((transaction) => {
                        const newDate = new Date(transaction.date);
                        const formattedDate = newDate.toLocaleDateString();
                        return (
                        <tr key = {transaction._id}>
                            <td>{transaction.name}</td>
                            <td>{transaction.price}</td>
                            <td>{formattedDate}</td>
                            <td>{transaction.budgetType}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={Math.ceil(transactions.length / perPage)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={pageChange}
                previousLabel="<Prev"
                nextLabel="Next>"
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>

        </div>
    )
}

export default Dashboard;
