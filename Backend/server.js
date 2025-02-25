// server.js

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

// const url = 'mongodb://localhost:27017';
const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-cupbi/endpoint/data/v1';
const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('Tasks');
  return db.collection('documents');
}

app.get('/api/data', async (req, res) => {
  const collection = await main();
  const data = await collection.find().toArray();
  res.json(data);
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
