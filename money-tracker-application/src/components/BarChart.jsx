import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import '../styles/BarChart.css';

/**
 * Bar Chart visualization for transactions
 * @returns {JSX.Element}   A component for a bar chart display
 */
function BarPlot() {
    const [transactions, setTransactions] = useState([])

    /**
     * Make a GET request to backend for transaction data
     * @returns {<Array<Object>>} An array of fetched transaction 
     * objects with properties such as name,date,price,desc. 
     */
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
    

    /**
     * Groups transactions into amount per month
     * @returns {<Array<Object>>} An array of these new objects containing the 
     * month, income and expense for that given month
     */
    function groupTransactions() {
        const monthGroups = transactions.reduce((monthObj,transaction) => {
            const date = new Date(transaction.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const key = `${month}/${year}`;
            //condition if current month not yet present
            if (!monthObj[key]) {
                monthObj[key] = {
                    month: `${year}/${month}`,
                    Income: 0,
                    Expense: 0
                };
            }
            //condition for expense or income
            if (transaction.price >= 0) {
                monthObj[key].Income += Math.round((transaction.price + Number.EPSILON) * 100) / 100;
                
            }
            else {
                monthObj[key].Expense += Math.abs(Math.round((transaction.price + Number.EPSILON) * 100) / 100);
            }
            return monthObj;
        }, {});

        //sort data by month and year
        let data = Object.values(monthGroups);

        data = data.sort((one,two) => {
            const date1 = new Date(one.month);
            const date2 = new Date(two.month);
            return date1-date2;
        })


        return data;
    }

    //instantiate data for bar chart
    const data = groupTransactions();

  return (
    //bar chart instance
    <div className="plot">
        <h2>Transaction History</h2>
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        //specifications of bar chart
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="lightgreen" />
        <Bar dataKey="Expense" fill="red" />
        </BarChart>
        {console.log(data)}
    </div>

  );
}

export default BarPlot;