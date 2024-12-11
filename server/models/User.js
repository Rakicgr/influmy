import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  tokens: { type: Number, default: 0 },
  avatar: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
