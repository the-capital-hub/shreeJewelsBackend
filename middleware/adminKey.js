module.exports = (req, res, next) => {
  const configuredKey = process.env.ADMIN_API_KEY;
  const suppliedKey = req.get("x-admin-key");

  if (!configuredKey) {
    return res.status(503).json({
      success: false,
      message: "Admin API key is not configured on the server",
    });
  }

  if (!suppliedKey || suppliedKey !== configuredKey) {
    return res.status(401).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};
