import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import { RefreshToken } from "../Models/refreshToken.model";

export const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;

  console.log("====================================");
  console.log(cookies);
  console.log("====================================");

  return;
  if (!cookies?.refreshToken) {
    return next(new ErrorResponse("Không có refresh token", 401));
  }

  const refreshToken = cookies.refreshToken;

  const storedRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
  });
  if (!storedRefreshToken) {
    return next(new ErrorResponse("Refresh token không tồn tại trong DB", 403));
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new ErrorResponse("Refresh token không hợp lệ", 403));
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Access token mới hết hạn sau 15 phút
    });

    res.status(200).json({
      success: true,
      message: "Access token đã được làm mới",
      accessToken,
    });
  });
};
