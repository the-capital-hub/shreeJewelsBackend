const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const requiredText = (value) =>
  typeof value === "string" && value.trim().length > 0;

const createCodOrder = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message:
        "Request body missing. Send JSON with Content-Type: application/json",
    });
  }

  const { customer, items } = req.body;
console.log("COD items received:", JSON.stringify(items, null, 2));
  const customerFields = [
    "name",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
  ];

  if (
    !customer ||
    customerFields.some((field) => !requiredText(customer[field]))
  ) {
    return res.status(400).json({
      success: false,
      message: "Complete all customer and delivery fields",
    });
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Provide between 1 and 50 cart items",
    });
  }

  const quantities = new Map();

  for (const item of items) {
    if (
      !item ||
      !mongoose.isValidObjectId(item.productId) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Each item needs a valid productId and quantity from 1 to 20",
      });
    }

    const productId = String(item.productId);

    quantities.set(
      productId,
      (quantities.get(productId) || 0) + item.quantity
    );
  }

  const productIds = [...quantities.keys()];

  const products = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  }).lean();

  if (products.length !== productIds.length) {
    return res.status(400).json({
      success: false,
      message: "One or more products are unavailable",
    });
  }

  const productMap = new Map(
    products.map((product) => [String(product._id), product])
  );

  const orderItems = [];
  let subtotal = 0;

  for (const [productId, quantity] of quantities.entries()) {
    const product = productMap.get(productId);

    if (product.stock < quantity) {
      return res.status(409).json({
        success: false,
        message: `Insufficient stock for ${product.name}`,
      });
    }

    const lineTotal = (Math.round(product.price * 100) * quantity) / 100;
    subtotal += lineTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      sku: product.sku,
      quantity,
      unitPrice: product.price,
      lineTotal,
    });
  }

  const order = await Order.create({
    customer: Object.fromEntries(
      customerFields.map((field) => [field, customer[field].trim()])
    ),
    items: orderItems,
    subtotal,
    currency: "INR",
    paymentProvider: "cod",
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  return res.status(201).json({
    success: true,
    message: "COD order placed successfully",
    data: {
      orderId: order._id,
      subtotal: order.subtotal,
      currency: order.currency,
      paymentProvider: order.paymentProvider,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    },
  });
});

const listAdminOrders = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);

  const limit = Math.min(
    Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
    100
  );

  const [orders, total] = await Promise.all([
    Order.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Order.countDocuments(),
  ]);

  return res.json({
    success: true,
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const allowedStatuses = [
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!req.body || !allowedStatuses.includes(req.body.orderStatus)) {
    return res.status(400).json({
      success: false,
      message: `orderStatus must be one of: ${allowedStatuses.join(", ")}`,
    });
  }

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order ID",
    });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (
    order.paymentProvider !== "cod" &&
    order.paymentStatus !== "paid" &&
    req.body.orderStatus !== "cancelled"
  ) {
    return res.status(409).json({
      success: false,
      message: "Only COD or paid orders can be processed",
    });
  }

  order.orderStatus = req.body.orderStatus;
  await order.save();

  return res.json({
    success: true,
    data: order,
  });
});

module.exports = {
  createCodOrder,
  listAdminOrders,
  updateOrderStatus,
};