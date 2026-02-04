import crypto from "crypto";
import bcrypt from "bcryptjs";

/**
 * Generate a random token (raw format)
 * @returns {string} Raw token (hex)
 */
export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash a token for storage
 * @param {string} token Raw token
 * @returns {Promise<string>} Hashed token
 */
export const hashToken = async (token) => {
  return await bcrypt.hash(token, 10);
};

/**
 * Verify token against hash
 * @param {string} token Raw token
 * @param {string} hash Hashed token
 * @returns {Promise<boolean>} true if match
 */
export const verifyToken = async (token, hash) => {
  return await bcrypt.compare(token, hash);
};
