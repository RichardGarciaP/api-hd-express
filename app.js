require('dotenv').config();
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URI;

app.get('/posts', async (req, res) => {
  let client;

  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('herramientas_devops');
    const posts = await db.collection('posts').find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al consultar MongoDB:', error);
    res
      .status(500)
      .json({ status: 500, message: 'Error al obtener los posts' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Application running on port ', PORT);
});
