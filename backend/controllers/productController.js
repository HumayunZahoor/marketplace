import Product from '../models/Product.js'

export const addProduct = async (req, res) => {
  try {
    const { category, subcategory, productName, price, quantity, colors, features, size, email, shopId, onSale, priceOnSale } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    
    // console.log("Received Data:", {
    //   category,
    //   subcategory,
    //   productName,
    //   price,
    //   quantity,
    //   colors,
    //   features,
    //   email,
    //   shopId,
    //   image,
    // });

    if (!category || !subcategory || !productName || !price || !quantity  || !email || !shopId) {
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
      quantity,
      colors: JSON.parse(colors),
      features: JSON.parse(features),
      image,
      size: JSON.parse(size),
      email,
      shopId,
      onSale,
      priceOnSale,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};


// -----------------------------------


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
    const { category, subcategory, productName, price, quantity, colors, features, size, onSale, priceOnSale } = req.body;

    const updatedData = {
      category,
      subcategory,
      productName,
      onSale,
      priceOnSale,
    };

    
    if (price) {
      const priceValue = parseFloat(price);
      if (!isNaN(priceValue)) {
        updatedData.price = priceValue;
      } else {
        return res.status(400).json({ message: 'Invalid price value' });
      }
    }

    if (quantity) {
      const quantityValue = parseInt(quantity, 10);
      if (!isNaN(quantityValue)) {
        updatedData.quantity = quantityValue;
      } else {
        return res.status(400).json({ message: 'Invalid quantity value' });
      }
    }
    
    if (colors) {
      try {
        updatedData.colors = JSON.parse(colors);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for colors' });
      }
    }

    if (features) {
      try {
        updatedData.features = JSON.parse(features);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for features' });
      }
    }

    if (size) {
      try {
        updatedData.size = JSON.parse(size);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for size' });
      }
    }

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


//-------------------------------------------

// export const updateProductsOnSale = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { category, subcategory, productName, price, onSale, priceOnSale } = req.body;

//     const updatedData = {
//       category,
//       subcategory,
//       productName,
//       onSale,
//       priceOnSale,
//     };

//     if (price) {
//       const priceValue = parseFloat(price);
//       if (!isNaN(priceValue)) {
//         updatedData.price = priceValue;
//       } else {
//         return res.status(400).json({ message: 'Invalid price value' });
//       }
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const updateProductsOnSale = async (req, res) => {
  try {
    const { productId } = req.params;
    const { priceOnSale, onSale } = req.body;

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const originalPrice = currentProduct.price;

    // Check if the product is on sale
    if (onSale) {
      // Product is on sale
      if (priceOnSale !== undefined && priceOnSale !== null) {
        const discountPercentage = parseFloat(priceOnSale);

        if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
          return res.status(400).json({ message: 'Invalid priceOnSale value. It should be a percentage between 0 and 100.' });
        }

        const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { price: discountedPrice, priceOnSale: discountPercentage, onSale },
          { new: true }
        );

        return res.json(updatedProduct);
      } else {
        return res.status(400).json({ message: 'priceOnSale is required to calculate the discount' });
      }
    } else {
      // Product is not on sale
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { price: originalPrice, priceOnSale: null, onSale: false },
        { new: true }
      );

      return res.json(updatedProduct);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//-----------------------------------------------

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error. Could not fetch products.' });
  }
};