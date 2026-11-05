const express = require("express");
const {
  listProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Public product endpoints
router.get("/", listProducts);
router.get("/:idOrSlug", getProductByIdOrSlug);

// Admin only: valid login token + admin role required
router.post("/", requireAuth, requireAdmin, createProduct);
router.patch("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

module.exports = router;