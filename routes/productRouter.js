const { deleteProductController,createProductController,updateCategoryController,getAllproductsController,singleproductController, productPhotoController } =require ("../controller/productController")
const { isAdmin, requireSignIn } =require ("../middleware/authMiddleware")

const express = require("express")
const router= express.Router()
const formidableMiddleware = require('express-formidable');
 

//routes product create 
router.post("/create-product",requireSignIn,isAdmin,formidableMiddleware(), createProductController)
//routes get  all

router.get("/getall-product", getAllproductsController)

//routes get  single  
router.get("/single-product/:slug", singleproductController)

//routes delete  
router.get("/delete-product/:id", deleteProductController)

//routes photo  
router.get("/photo-product/:pid", productPhotoController)



module.exports= router