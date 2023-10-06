import mongoose from "mongoose";
import bcrybt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrybt.genSalt(10);
  this.password = await bcrybt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrybt.compare(enterdPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
