require('dotenv').config();
console.log('Environment Variables:', process.env); // Add this line to debug

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

console.log('MongoDB URI:', process.env.MONGO_URI); // Debug MongoDB URI

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

const cors = require('cors');
// Add this before your routes
app.use(cors());

app.post('/contact', async (req, res) => {
    console.log('Received data:', req.body); // Log the received form data
    try {
      const contact = new Contact(req.body);
      await contact.save();
      console.log('Data saved successfully');
      res.status(201).send({ success: true, message: 'Data saved successfully' });
    } catch (err) {
      console.error('Error saving data:', err); // Log any backend errors
      res.status(500).send({ success: false, message: 'Failed to save data', error: err });
    }
  });
  








