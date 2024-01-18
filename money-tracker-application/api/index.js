import express from 'express';
import cors from 'cors';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test',(req,res)=> {
    res.json("Do you like what the rock is cooking?");
});

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`)
});

app.post('/api/transaction', (req,res) => {
    res.json(req.body)
});


