const Product = require("../models/Product");

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const makeSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

// Public: active products only
const listProducts = asyncHandler(async (req, res) => {
  const {
    search = "",
    category,
    collection,
    minPrice,
    maxPrice,
    sort = "newest",
    page = "1",
    limit = "12",
  } = req.query;

  const pageNumber = Math.max(Number.parseInt(page, 10) || 1, 1);
  const pageSize = Math.min(
    Math.max(Number.parseInt(limit, 10) || 12, 1),
    100
  );

  const filter = { isActive: true };

  if (category) filter.category = category;
  if (collection) filter.collection = collection;

  if (search.trim()) {
    filter.$text = { $search: search.trim() };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      const value = Number(minPrice);
      if (!Number.isFinite(value) || value < 0) {
        return res.status(400).json({
          success: false,
          message: "minPrice must be a valid non-negative number",
        });
      }
      filter.price.$gte = value;
    }

    if (maxPrice !== undefined) {
      const value = Number(maxPrice);
      if (!Number.isFinite(value) || value < 0) {
        return res.status(400).json({
          success: false,
          message: "maxPrice must be a valid non-negative number",
        });
      }
      filter.price.$lte = value;
    }
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    priceLow: { price: 1 },
    priceHigh: { price: -1 },
    name: { name: 1 },
  };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortOptions[sort] || sortOptions.newest)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

// Admin: include active and inactive products
const listAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: products,
  });
});

// Public: get an active product by MongoDB ID or slug
const getProductByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const query = isValidObjectId(idOrSlug)
    ? { _id: idOrSlug, isActive: true }
    : { slug: idOrSlug.toLowerCase(), isActive: true };

  const product = await Product.findOne(query).lean();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({ success: true, data: product });
});

// Admin: create a product
const createProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (!payload.name || !payload.name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Product name is required",
    });
  }

  if (!payload.slug) {
    payload.slug = makeSlug(payload.name);
  }

  const product = await Product.create(payload);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// Admin: update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const updates = { ...req.body };

  // Keep slug in sync when product name changes, unless slug is supplied.
  if (updates.name && !updates.slug) {
    updates.slug = makeSlug(updates.name);
  }

  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

// Admin: permanently delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product deleted",
  });
});

module.exports = {
  listProducts,
  listAdminProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
};