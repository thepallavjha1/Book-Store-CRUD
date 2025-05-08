const express = require('express');
const app = express();
const router = require('./routes/book.route.js');
const connectDB = require('./config/config.db.js');
connectDB();


app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
