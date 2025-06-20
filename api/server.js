const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Apply CORS middleware with explicit origin
app.use(cors()); // <-- this enables CORS for all routes and all origins
app.use(express.json());

const todoRoutes = require('./routes/todo-route');
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
