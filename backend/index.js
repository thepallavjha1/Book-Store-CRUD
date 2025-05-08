const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/book.route.js');
const connectDB = require('./config/config.db.js');
connectDB();
app.use(cors())
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
