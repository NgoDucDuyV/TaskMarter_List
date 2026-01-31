import { User } from "../Models/user.model";
import { RefreshToken } from "../Models/refreshToken.model";

import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import crypto from "crypto";
import ErrorResponse from "../utils/ErrorResponse.js";
import Session from "../Models/session.model.js";

const ACCESS_TOKEN_TTL = "15s"; // thuờng là dưới 15m
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày
export const SignUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, dateOfBirth } =
      req.body;
    console.log(req.body);
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        status: false,
        message:
          " Tài khoản không thể thiếu các trường dữ liệu username, password, email, firstName và lasName",
      });
    }

    // Kiểm tra username có tồn tại chưa
    const duplicate = await User.findOne({ email }); // mã hóa Password

    if (duplicate) {
      return res.status(409).json({
        status: false,
        message: "Uername or email đã tồn tại",
      });
    }
    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 12);

    //tạo user mới
    await User.create({
      username,
      passwordHash: hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
      dateOfBirth,
    });

    res.status(202).json({
      status: true,
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    console.log("Lỗi khi kết lối tạo tài khảon", error);
    res.status(500).json({
      message: "Lỗi kết lỗi khi tạo tài khoản",
      error,
    });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // nhập đủ dữ liệu
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Nhập đầy đủ email and password" });
    }

    // Kiểm tra username có tồn tại không
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Lỗi không đúng email" });
    }
    // Kiểm tra pasword

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    console.log(isPasswordValid);
    
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Lỗi không đúng email or password" });
    }
    // khớp , tạo accessToken với jwt

    const accessToken = await Jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECSET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );
    // tạo refresh token

    const refreshToken = crypto.randomBytes(64).toString("hex");
    //tạo sesstion mới để lưu refresh token

    // console.log(refreshToken);
    // return
    Session.create({
      userId: user._id,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
    // trả refreshToken về trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    user.passwordHash = undefined;
    //trả accessToken về cho res
    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.log("Lỗi khi kết lối signIn", error);
    res.status(500).json({
      message: "Lỗi Khi kết lỗi đăng nhập tài khoản signIn ",
      error,
    });
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select("-passwordHash");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User information retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const SignOut = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.sendStatus(204); // Không có refresh token, không có gì để xóa
  }
  const refreshToken = cookies.refreshToken;

  // Xóa refresh token khỏi DB
  await RefreshToken.deleteOne({ token: refreshToken });

  // Xóa refresh token khỏi cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.sendStatus(204);
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select("-passwordHash");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
