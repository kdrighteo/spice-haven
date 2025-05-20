const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['ground', 'whole', 'blend', 'gift-set']
  },
  origin: {
    type: String,
    required: true
  },
  flavorProfile: [{
    type: String
  }],
  heatLevel: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  weight: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['g', 'oz', 'lb'],
      default: 'g'
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 