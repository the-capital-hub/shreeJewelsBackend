const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const Product = require("../models/Product");
const Order = require("../models/Order");

const { listAdminProducts } = require("../controllers/productController");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", requireAuth, requireAdmin, async (req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      paidOrders,
      revenueResult,
      orderStatusCounts,
      recentOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.countDocuments({ paymentStatus: "paid" }),

      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: null,
            total: { $sum: "$subtotal" },
          },
        },
      ]),

      Order.aggregate([
        {
          $group: {
            _id: "$orderStatus",
            count: { $sum: 1 },
          },
        },
      ]),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "customer.name customer.email subtotal paymentStatus orderStatus createdAt"
        ),
    ]);

    const statusCounts = {};

    for (const item of orderStatusCounts) {
      statusCounts[item._id] = item.count;
    }

    return res.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        paidOrders,
        paidRevenue: revenueResult[0]?.total || 0,
        currency: "INR",
        orderStatusCounts: statusCounts,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard data",
    });
  }
});

// Admin Products List
router.get(
  "/products",
  requireAuth,
  requireAdmin,
  listAdminProducts
);

module.exports = router;