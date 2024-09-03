import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { category, subcategory, productName, price, colors, features, email, shopId } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newProduct = new Product({
      category,
      subcategory,
      productName,
      price,
      colors: JSON.parse(colors),
      features: JSON.parse(features),
      image,
      email,
      shopId,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
