import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name can\'t be null'],
  },
  email: {
    type: String,
    required: [true, 'Email can\'t be null'],
  },
  token: { type: String },
});

UserSchema.method({});

UserSchema.static({});

export default mongoose.model('User', UserSchema);
