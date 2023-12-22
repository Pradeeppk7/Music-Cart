const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  quantity: {
    type: Number,
  },
  image: {
    type: Array,
  },
  color: {
    type: String,
    enum: ['black', 'red', 'blue'],
  },
  ratings: {
    type: Number,
  },
  brand: {
    type: String,
    enum: ['Apple', 'bose', 'Lenovo', 'OnePlus','Sony','JBL', 'Beats'],
  },
  headphonetype: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
