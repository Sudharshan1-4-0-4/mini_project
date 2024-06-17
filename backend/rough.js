const express = require('express');
const app = express();
app.use(express.json());


const products = [
    {id: 1, name: "sudharshan"},
    {id: 2, name: "kaira"}
]


app.post("/addUser", async (request, response) => {
    const {id, name} = request.body;
    
    const obj = { id, name};
   
    products.push(obj);
    response.send("added...");
});


app.get('/products', (req, res) => {
    const res1 = res.json(products);
    res.send(res1);
});

app.listen(4006, () => {
    console.log(`Server is running on http://localhost:4006`);
});