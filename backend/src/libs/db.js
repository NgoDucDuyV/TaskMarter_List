import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Kết nối cơ sở dữ liệu không thành công:", error);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được DB
  }
};
