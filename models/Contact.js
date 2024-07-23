const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, 
  date: { type: Date, default: Date.now},
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
