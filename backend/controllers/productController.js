import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc fetch all products
// @routes GET api/products
// @access - public

const getProducts = asyncHandler( async(req ,res) => {
    const products = await Product.find({

    })
    res.json(products);

});

// @desc fetch single product by id
// @routes GET api/products/:id
// @access - public

const getProductById = asyncHandler(async(req,res) => {
   
        const product = await Product.findById(req.params.id);
        if(product){
           return res.json(product);
        } else{
           res.status(404);
           throw new Error("Resource not found");
       
        }
    
        
   

})

// @desc create single product
// @routes POST api/products
// @access - private/admin


   const createProduct = asyncHandler(async (req, res) => {
      const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
      });
    
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    });

    // @desc update products
// @routes PUT api/products
// @access - private/admin

const updateProduct = asyncHandler( async(req ,res) => {
   const {name,price,description, image ,brand, category,countInStock} = req.body;

   const product = await Product.findById(req.params.id);

   if(product){
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);


   }else{
      res.status(404)
      throw new Error("product not updated");
   }
   
   

});

 // @desc delete products
// @routes DELETE api/products
// @access - private/admin

const deleteProduct = asyncHandler( async(req ,res) => {
  

   const product = await Product.findById(req.params.id);

   if(product){
      await Product.deleteOne({_id : product._id})
      res.status(200).json({message : "Product Deleted"});



   }else{
      res.status(404)
      throw new Error("product not deleted");
   }
   
   

});

   



export {getProductById ,getProducts , createProduct,deleteProduct, updateProduct};