const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadImage");
const requireAdmin = require("../middleware/requireAdmin");
const { uploadProductImage } = require("../controllers/uploadController");

router.post(
  "/product-image",
  requireAdmin,
  upload.single("image"),
  uploadProductImage
);

module.exports = router;