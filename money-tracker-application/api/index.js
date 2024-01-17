import express from 'express';
const port = 3000;
const app = express();

app.get('/api/test',(req,res)=> {
    res.json("Do you like what the rock is cooking?");
});

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`)
});

app.post('/api/transaction', (req,res) => {
    res.json(req.body)
});