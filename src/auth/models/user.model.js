import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define model properties
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// Defines a pre-hook to hash the user's password
// This pre-hook happens before the 'save' method
userSchema.pre("save", function (next) {
  const user = this;
  // Creates a salt
  // Salt is a random string used to hash a value that ensures that each
  // time this value is hashed, the value of the hash will be different
  // because the salt is different
  const salt = bcrypt.genSaltSync();
  // Encrypts the user password
  const hash = bcrypt.hashSync(user.password, salt);
  // Sets the password as its hash value
  user.password = hash;

  // Proceeds to next hook or the save method
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  const matches = bcrypt.compareSync(candidatePassword, user.password);
  return matches;
};

// Create model class
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
