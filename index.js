import express from "express";
const app = express()
import cors from "cors"
import {MongoClient, ObjectId} from "mongodb";
const uri = "mongodb+srv://shivanipatelthota:mH1vM3S6EWCyrjWp@cluster0.j2n70.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = client.db("ecomm")

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const items = await db.collection("products").find().toArray()
    res.status (200).json(items);
})

app.listen(8080,()=>{
    console.log("Server started at port 8080")
})

app.get("/", async (req, res) => {
    const items = await db.collection("products").find().toArray();
    res.status(200).json(items);
  });
  
app.post("/", async (req, res) => {
    const { name,desc,price,url } = req.body;
    const data = {
        name: name,
        descr:desc,
        price: price,
        url:url
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
});
  
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
    res.status(200).json(newProduct);
});

// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

// app.get("/home",(req,res)=>{
//     res.send("This is home api")
// })

// app.get("/products",(req,res)=>{
//     let products=[
//         {
//             "name": "product 1",
//             "price": 34
//         }
//     ]
//     res.json(products)
// })

// app.get("/customers",(req,res)=>{
//     let customers=[
//         {
//             "name": "Shivani",
//             "email": "abc@gmailcom",
//             "phone": 1234567890
//         }
//     ]
//     res.json(customers)
// })