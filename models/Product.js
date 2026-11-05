const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 200,
    },
    sku: {
      type: String,
      required: [true, "Product code is required"],
      trim: true,
      uppercase: true,
      unique: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: 5000,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Gold Jewellery",
        "Diamond Jewellery",
        "Bridal Jewellery",
        "Platinum Jewellery",
        "Silver Jewellery",
        "Gemstone Jewellery",
      ],
    },
    collection: {
      type: String,
      trim: true,
      default: "Traditional Collection",
    },
    metal: {
      type: String,
      trim: true,
      enum: ["Yellow Gold", "White Gold", "Rose Gold", "Platinum", "Silver", "Other"],
      default: "Yellow Gold",
    },
    purity: {
      type: String,
      trim: true,
      default: "",
    },
    grossWeightGrams: {
      type: Number,
      min: 0,
      default: 0,
    },
    netWeightGrams: {
      type: Number,
      min: 0,
      default: 0,
    },
    stoneDetails: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => images.every((image) => typeof image === "string" && image.trim()),
        message: "Every image must be a non empty URL",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", sku: "text" });
productSchema.index({ category: 1, isActive: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);
