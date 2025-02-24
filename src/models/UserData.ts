import mongoose from "mongoose";

export interface UserLogin {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<UserLogin>({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

export const UserLoginModel = mongoose.model("User", UserSchema);
