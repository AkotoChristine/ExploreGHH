// Node.js + Express (server.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ success: true, message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Failed to save data', error: err });
  }
});

const PORT = 5000; // Ensure this matches your frontend config
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

