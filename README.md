# Budget Tracker

Budget Tracker is an application created to help users track income and expenses based on created budget categories. A dashboard helps you visualize newly added transactions.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

## Set Up

You will need to create a [MongoDB](https://www.mongodb.com/) database for the backend. There are tutorials on how to set it up, but at least for testing you'll probably want to set the network access to ANY for your personal use. Or if you know your IP and won't be using a VPN or anything, you could do that too. Once set up, you'll need store the Mongo URL as MONGO_URL in a .env file in your api folder.

Additionally, you will need to create a Firebase application for authentication and store the config in a file firebase.js in your root directory.

## Running Application

You'll need two console sessions. If you're using VS Code, it's pretty easy to open multiple sessions. 

### Backend

For the express application (index.js), you'll want to navigate to the api folder and run the following command:

```Javascript
nodemon .\index.js
```
Using nodemon will enable the application to dynamically apply updates to the backend so you don't have to continuously re-run the server.

### Frontend

For the frontend, run the following: 

```Javascript
npm run dev
```

Once run, this will enable you to go to the localhost url provided and view the application. 

## Usage
### Login and Signup pages
These pages prompt the user for credentials. Each page redirects to the other, so the user can log in if they've already created an account, or sign up if it's their first time. Data is stored in a firebase database.

### Dashboard
The dashboard page has a graph with your transaction history and transactions. This helps the user visualize their spending trends.


### Budgets
The budgets page provides a form for adding new budgets (name and amount) to your existing budgets. Existing budgets can be viewed on the right hand side of the page, along with details pertaining to that budget.

### Transactions

The transactions page provides a form adding new transactions to your transaction history. Transaction information includes the name, date, description, price, and associated budget. Recent transactions can be viewed to the right of the page.

### NavBar

The NavBar allows you to navigate to the aforementioned pages, with an additional button to log the user out of the application

## Technologies Used

1. MongoDB
2. Node.js
3. Express.js
4. React.js

#Future Work
I plan to add a completion bar to the budgets page to display the amount of money spent out of the whole budget.

I plan to add sort and search functionalities for expenses so that you can search and sort based on the available categories.
