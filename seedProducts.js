const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const connectDB = require("./config/db");

const products = [
  {
    "name": "Gold Filigree Pendant Necklace Set",
    "slug": "gold-filigree-pendant-necklace-set",
    "sku": "SJ-DEMO-001",
    "description": "An elegant gold filigree pendant necklace set from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 18.4,
    "netWeightGrams": 16.8,
    "stoneDetails": "",
    "price": 25000,
    "compareAtPrice": null,
    "stock": 5,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Ruby Drop Earrings",
    "slug": "ruby-drop-earrings",
    "sku": "SJ-DEMO-002",
    "description": "An elegant ruby drop earrings from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 9.1,
    "netWeightGrams": 8.3,
    "stoneDetails": "",
    "price": 48500,
    "compareAtPrice": null,
    "stock": 10,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Pearl Gold Necklace",
    "slug": "pearl-gold-necklace",
    "sku": "SJ-DEMO-003",
    "description": "An elegant pearl gold necklace from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 24.0,
    "netWeightGrams": 21.7,
    "stoneDetails": "",
    "price": 98500,
    "compareAtPrice": 109000,
    "stock": 6,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Diamond Halo Pendant",
    "slug": "diamond-halo-pendant",
    "sku": "SJ-DEMO-004",
    "description": "An elegant diamond halo pendant from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 5.1,
    "netWeightGrams": 4.6,
    "stoneDetails": "Diamond accents",
    "price": 63500,
    "compareAtPrice": null,
    "stock": 8,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Diamond Tennis Bracelet",
    "slug": "diamond-tennis-bracelet",
    "sku": "SJ-DEMO-005",
    "description": "An elegant diamond tennis bracelet from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 12.0,
    "netWeightGrams": 10.5,
    "stoneDetails": "Diamond accents",
    "price": 142000,
    "compareAtPrice": 158000,
    "stock": 3,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Diamond Stud Earrings",
    "slug": "diamond-stud-earrings",
    "sku": "SJ-DEMO-006",
    "description": "An elegant diamond stud earrings from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 3.2,
    "netWeightGrams": 2.8,
    "stoneDetails": "Diamond accents",
    "price": 32900,
    "compareAtPrice": null,
    "stock": 14,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Kundan Bridal Earrings",
    "slug": "kundan-bridal-earrings",
    "sku": "SJ-DEMO-007",
    "description": "An elegant kundan bridal earrings from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 18.0,
    "netWeightGrams": 15.9,
    "stoneDetails": "",
    "price": 89500,
    "compareAtPrice": null,
    "stock": 5,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Bridal Rani Haar",
    "slug": "bridal-rani-haar",
    "sku": "SJ-DEMO-008",
    "description": "An elegant bridal rani haar from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 78.0,
    "netWeightGrams": 69.0,
    "stoneDetails": "",
    "price": 425000,
    "compareAtPrice": 460000,
    "stock": 2,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": true,
    "isActive": true
  },
  {
    "name": "Polki Maang Tikka",
    "slug": "polki-maang-tikka",
    "sku": "SJ-DEMO-009",
    "description": "An elegant polki maang tikka from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 14.2,
    "netWeightGrams": 12.6,
    "stoneDetails": "",
    "price": 76500,
    "compareAtPrice": null,
    "stock": 4,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Silver Oxidised Necklace",
    "slug": "silver-oxidised-necklace",
    "sku": "SJ-DEMO-010",
    "description": "An elegant silver oxidised necklace from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 35.0,
    "netWeightGrams": 31.5,
    "stoneDetails": "",
    "price": 18900,
    "compareAtPrice": null,
    "stock": 11,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Silver Floral Studs",
    "slug": "silver-floral-studs",
    "sku": "SJ-DEMO-011",
    "description": "An elegant silver floral studs from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 8.5,
    "netWeightGrams": 7.8,
    "stoneDetails": "",
    "price": 4900,
    "compareAtPrice": null,
    "stock": 20,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Silver Kada Pair",
    "slug": "silver-kada-pair",
    "sku": "SJ-DEMO-012",
    "description": "An elegant silver kada pair from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 28.0,
    "netWeightGrams": 25.6,
    "stoneDetails": "",
    "price": 15900,
    "compareAtPrice": null,
    "stock": 9,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Ruby Gold Cocktail Ring",
    "slug": "ruby-gold-cocktail-ring",
    "sku": "SJ-DEMO-013",
    "description": "An elegant ruby gold cocktail ring from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 6.7,
    "netWeightGrams": 5.9,
    "stoneDetails": "Gemstone accents",
    "price": 44900,
    "compareAtPrice": null,
    "stock": 6,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Emerald Drop Earrings",
    "slug": "emerald-drop-earrings",
    "sku": "SJ-DEMO-014",
    "description": "An elegant emerald drop earrings from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 10.4,
    "netWeightGrams": 9.2,
    "stoneDetails": "Gemstone accents",
    "price": 72500,
    "compareAtPrice": 79900,
    "stock": 5,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Sapphire Pendant",
    "slug": "sapphire-pendant",
    "sku": "SJ-DEMO-015",
    "description": "An elegant sapphire pendant from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 4.9,
    "netWeightGrams": 4.3,
    "stoneDetails": "Gemstone accents",
    "price": 38900,
    "compareAtPrice": null,
    "stock": 8,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Rose Gold Band",
    "slug": "rose-gold-band",
    "sku": "SJ-DEMO-016",
    "description": "An elegant rose gold band from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Rose Gold",
    "purity": "18K",
    "grossWeightGrams": 4.2,
    "netWeightGrams": 3.8,
    "stoneDetails": "",
    "price": 28900,
    "compareAtPrice": null,
    "stock": 10,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Platinum Couple Bands",
    "slug": "platinum-couple-bands",
    "sku": "SJ-DEMO-017",
    "description": "An elegant platinum couple bands from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Platinum",
    "purity": "950",
    "grossWeightGrams": 8.8,
    "netWeightGrams": 8.1,
    "stoneDetails": "",
    "price": 89500,
    "compareAtPrice": null,
    "stock": 4,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Platinum Solitaire Pendant",
    "slug": "platinum-solitaire-pendant",
    "sku": "SJ-DEMO-018",
    "description": "An elegant platinum solitaire pendant from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Platinum",
    "purity": "950",
    "grossWeightGrams": 3.9,
    "netWeightGrams": 3.5,
    "stoneDetails": "",
    "price": 45900,
    "compareAtPrice": null,
    "stock": 7,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Temple Lakshmi Pendant",
    "slug": "temple-lakshmi-pendant",
    "sku": "SJ-DEMO-019",
    "description": "An elegant temple lakshmi pendant from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 16.3,
    "netWeightGrams": 14.7,
    "stoneDetails": "",
    "price": 68500,
    "compareAtPrice": null,
    "stock": 6,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Gold Coin Necklace",
    "slug": "gold-coin-necklace",
    "sku": "SJ-DEMO-020",
    "description": "An elegant gold coin necklace from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 27.5,
    "netWeightGrams": 25.1,
    "stoneDetails": "",
    "price": 139000,
    "compareAtPrice": 149000,
    "stock": 4,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Diamond Cluster Bracelet",
    "slug": "diamond-cluster-bracelet",
    "sku": "SJ-DEMO-021",
    "description": "An elegant diamond cluster bracelet from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 9.8,
    "netWeightGrams": 8.7,
    "stoneDetails": "Diamond accents",
    "price": 112000,
    "compareAtPrice": null,
    "stock": 5,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Diamond Leaf Pendant",
    "slug": "diamond-leaf-pendant",
    "sku": "SJ-DEMO-022",
    "description": "An elegant diamond leaf pendant from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 4.6,
    "netWeightGrams": 4.0,
    "stoneDetails": "Diamond accents",
    "price": 52900,
    "compareAtPrice": null,
    "stock": 9,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Bridal Hasli Necklace",
    "slug": "bridal-hasli-necklace",
    "sku": "SJ-DEMO-023",
    "description": "An elegant bridal hasli necklace from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 55.0,
    "netWeightGrams": 48.8,
    "stoneDetails": "",
    "price": 289000,
    "compareAtPrice": null,
    "stock": 3,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Kundan Chandbali Earrings",
    "slug": "kundan-chandbali-earrings",
    "sku": "SJ-DEMO-024",
    "description": "An elegant kundan chandbali earrings from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 21.4,
    "netWeightGrams": 18.9,
    "stoneDetails": "",
    "price": 98500,
    "compareAtPrice": 108000,
    "stock": 4,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Silver Peacock Anklets",
    "slug": "silver-peacock-anklets",
    "sku": "SJ-DEMO-025",
    "description": "An elegant silver peacock anklets from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 42.0,
    "netWeightGrams": 38.0,
    "stoneDetails": "",
    "price": 11900,
    "compareAtPrice": null,
    "stock": 12,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Silver Filigree Pendant",
    "slug": "silver-filigree-pendant",
    "sku": "SJ-DEMO-026",
    "description": "An elegant silver filigree pendant from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 11.2,
    "netWeightGrams": 10.3,
    "stoneDetails": "",
    "price": 6500,
    "compareAtPrice": null,
    "stock": 18,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Ruby Halo Pendant",
    "slug": "ruby-halo-pendant",
    "sku": "SJ-DEMO-027",
    "description": "An elegant ruby halo pendant from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 5.8,
    "netWeightGrams": 5.1,
    "stoneDetails": "Gemstone accents",
    "price": 57900,
    "compareAtPrice": null,
    "stock": 6,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Pearl and Emerald Necklace",
    "slug": "pearl-and-emerald-necklace",
    "sku": "SJ-DEMO-028",
    "description": "An elegant pearl and emerald necklace from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 29.0,
    "netWeightGrams": 25.4,
    "stoneDetails": "Gemstone accents",
    "price": 165000,
    "compareAtPrice": 179000,
    "stock": 2,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Platinum Wedding Ring",
    "slug": "platinum-wedding-ring",
    "sku": "SJ-DEMO-029",
    "description": "An elegant platinum wedding ring from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Platinum",
    "purity": "950",
    "grossWeightGrams": 6.1,
    "netWeightGrams": 5.7,
    "stoneDetails": "",
    "price": 74900,
    "compareAtPrice": null,
    "stock": 5,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Platinum Diamond Hoops",
    "slug": "platinum-diamond-hoops",
    "sku": "SJ-DEMO-030",
    "description": "An elegant platinum diamond hoops from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Platinum",
    "purity": "950",
    "grossWeightGrams": 7.4,
    "netWeightGrams": 6.8,
    "stoneDetails": "",
    "price": 98500,
    "compareAtPrice": null,
    "stock": 3,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Gold Mangalsutra Pendant",
    "slug": "gold-mangalsutra-pendant",
    "sku": "SJ-DEMO-031",
    "description": "An elegant gold mangalsutra pendant from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 12.5,
    "netWeightGrams": 11.4,
    "stoneDetails": "",
    "price": 58900,
    "compareAtPrice": null,
    "stock": 7,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Diamond Heart Pendant",
    "slug": "diamond-heart-pendant",
    "sku": "SJ-DEMO-032",
    "description": "An elegant diamond heart pendant from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 3.8,
    "netWeightGrams": 3.3,
    "stoneDetails": "Diamond accents",
    "price": 42500,
    "compareAtPrice": null,
    "stock": 10,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Traditional Temple Necklace Set",
    "slug": "traditional-temple-necklace-set",
    "sku": "SJ-DEMO-033",
    "description": "An elegant traditional temple necklace set from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 38.5,
    "netWeightGrams": 34.2,
    "stoneDetails": "",
    "price": 124500,
    "compareAtPrice": 138000,
    "stock": 8,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Floral Diamond Earrings",
    "slug": "floral-diamond-earrings",
    "sku": "SJ-DEMO-034",
    "description": "An elegant floral diamond earrings from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "White Gold",
    "purity": "18K",
    "grossWeightGrams": 8.2,
    "netWeightGrams": 7.4,
    "stoneDetails": "Diamond accents",
    "price": 78900,
    "compareAtPrice": null,
    "stock": 12,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Royal Bridal Choker Set",
    "slug": "royal-bridal-choker-set",
    "sku": "SJ-DEMO-035",
    "description": "An elegant royal bridal choker set from the Shree Jewels bridal jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Bridal Jewellery",
    "collection": "Bridal Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 62.0,
    "netWeightGrams": 54.8,
    "stoneDetails": "",
    "price": 345000,
    "compareAtPrice": 380000,
    "stock": 4,
    "images": [
      "/products/bridal-kundan-choker.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Heritage Silver Jhumka",
    "slug": "heritage-silver-jhumka",
    "sku": "SJ-DEMO-036",
    "description": "An elegant heritage silver jhumka from the Shree Jewels silver jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Silver Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Silver",
    "purity": "925",
    "grossWeightGrams": 22.4,
    "netWeightGrams": 20.1,
    "stoneDetails": "",
    "price": 12900,
    "compareAtPrice": null,
    "stock": 15,
    "images": [
      "/products/silver-jhumka.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Classic Solitaire Ring",
    "slug": "classic-solitaire-ring",
    "sku": "SJ-DEMO-037",
    "description": "An elegant classic solitaire ring from the Shree Jewels diamond jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Diamond Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 4.8,
    "netWeightGrams": 4.1,
    "stoneDetails": "Diamond accents",
    "price": 56900,
    "compareAtPrice": null,
    "stock": 9,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Heritage Gold Bangles",
    "slug": "heritage-gold-bangles",
    "sku": "SJ-DEMO-038",
    "description": "An elegant heritage gold bangles from the Shree Jewels gold jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gold Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "22K",
    "grossWeightGrams": 31.2,
    "netWeightGrams": 29.5,
    "stoneDetails": "",
    "price": 218000,
    "compareAtPrice": null,
    "stock": 6,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Emerald Pendant Set",
    "slug": "emerald-pendant-set",
    "sku": "SJ-DEMO-039",
    "description": "An elegant emerald pendant set from the Shree Jewels gemstone jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Gemstone Jewellery",
    "collection": "Signature Collection",
    "metal": "Yellow Gold",
    "purity": "18K",
    "grossWeightGrams": 12.6,
    "netWeightGrams": 10.8,
    "stoneDetails": "Gemstone accents",
    "price": 176500,
    "compareAtPrice": 189000,
    "stock": 5,
    "images": [
      "/products/gold-temple-necklace.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  },
  {
    "name": "Platinum Eternity Band",
    "slug": "platinum-eternity-band",
    "sku": "SJ-DEMO-040",
    "description": "An elegant platinum eternity band from the Shree Jewels platinum jewellery range. Crafted for memorable occasions and timeless style.",
    "category": "Platinum Jewellery",
    "collection": "Everyday Elegance",
    "metal": "Platinum",
    "purity": "950",
    "grossWeightGrams": 5.6,
    "netWeightGrams": 5.2,
    "stoneDetails": "",
    "price": 67500,
    "compareAtPrice": null,
    "stock": 7,
    "images": [
      "/products/diamond-floral-set.jpg"
    ],
    "isFeatured": false,
    "isActive": true
  }
];

async function seed() {
  await connectDB();
const operations = products.map(({ sku, ...product }) => ({
  updateOne: {
    filter: { slug: product.slug },
    update: {
      $set: product,
      $setOnInsert: { sku },
    },
    upsert: true,
  },
}));
  const result = await Product.bulkWrite(operations);
  console.log(`Seed complete. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
