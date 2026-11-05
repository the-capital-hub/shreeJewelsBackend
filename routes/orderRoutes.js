const express = require("express");
const {
  createCodOrder,
  listAdminOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// Customer COD checkout
router.post("/cod", createCodOrder);

// Admin order management
router.get("/admin", requireAdmin, listAdminOrders);
router.patch("/admin/:id/status", requireAdmin, updateOrderStatus);

module.exports = router;