const jwt = require("jsonwebtoken");
const user = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.status(401).json({ error: "Not authorized" });
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
