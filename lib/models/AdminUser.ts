import mongoose, { Schema, model, models } from "mongoose";

const AdminUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Prevent redefining the model if it already exists
const AdminUser = models.AdminUser || model("AdminUser", AdminUserSchema);

export default AdminUser;
