import mongoose from "mongoose";

export interface UserLogin {
  email: string;
  password: string;
}

const UserLoginSchema = new mongoose.Schema<UserLogin>({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

export const UserLoginModel = mongoose.model("UserLogin", UserLoginSchema);
