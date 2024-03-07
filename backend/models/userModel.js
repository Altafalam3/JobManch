import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
      type: Number,
    },

    bio: {
      type: String,
      default: 'Available',
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    
    about: String,
    profilePic: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    tenth: Number,
    twelth: Number,
    cgpa: Number,
    roll: Number,
    dob: Date,
    department: String,
    passphrase: String,
    // job: Boolean,
    gender: String,
    drop: String,
    kt: String,
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.SECRET,
      {
        expiresIn: '24h',
      }
    );

    return token;
  } catch (error) {
    console.log('error while generating token');
  }
};

const userModel = mongoose.model('User', userSchema);
export default userModel;
