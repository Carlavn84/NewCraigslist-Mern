const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var PostSchema = new Schema({
title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type:Currency,
    required: true
  },
  contact: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);