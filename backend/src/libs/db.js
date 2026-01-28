import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết Lối cơ sở dữ liệu Thành Công");
  } catch (error) {
    console.log("Kết Lối cơ sở dữ liệu không thành công", error);
  }
};
