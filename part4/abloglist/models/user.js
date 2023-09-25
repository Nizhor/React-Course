const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = model('User', userSchema);
