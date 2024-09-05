import Product from '../models/Product.js'

export const addProduct = async (req, res) => {
  try {
    const { category, subcategory, productName, price, colors, features, email, shopId } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    
    console.log("Received Data:", {
      category,
      subcategory,
      productName,
      price,
      colors,
      features,
      email,
      shopId,
      image,
    });

    if (!category || !subcategory || !productName || !price || !colors || !features || !email || !shopId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
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
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};


// -----------------------------------

// Get all products for a specific shop
export const getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//-----------------------------------------


export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { category, subcategory, productName, price, colors, features } = req.body;

    const updatedData = {
      category,
      subcategory,
      productName,
    };

    // Handle `price` input
    if (price) {
      const priceValue = parseFloat(price);
      if (!isNaN(priceValue)) {
        updatedData.price = priceValue;
      } else {
        return res.status(400).json({ message: 'Invalid price value' });
      }
    }

    // Parse and handle `colors` input (expecting JSON array)
    if (colors) {
      try {
        updatedData.colors = JSON.parse(colors);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for colors' });
      }
    }

    // Parse and handle `features` input (expecting JSON array)
    if (features) {
      try {
        updatedData.features = JSON.parse(features);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for features' });
      }
    }

    // Handle file upload
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



//--------------------------------------------------

// Delete a specific product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};