const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4403;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obwl2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const serviceCollection = client.db("photography").collection("services");
 
  app.get('/services', (req, res) => {
    serviceCollection.find()
      .toArray((err, serviceItem)=> {
      res.send(serviceItem)
    })
})


    app.post("/add-services", (req, res) => {
      const service = req.body;
      serviceCollection.insertOne(service)
        .then((result) => {
        res.send(result.insertedCount > 0);
      });
    });
});

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port);