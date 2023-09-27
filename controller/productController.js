const { default: slugify } = require("slugify");
const productModel = require("../models/ProductModel");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(401).send({ message: "name is required " });
      case !description:
        return res.status(401).send({ message: "description is required " });
      case !price:
        return res.status(401).send({ message: "price is required " });
      case !category:
        return res.status(401).send({ message: "category is required " });
      case !quantity:
        return res.status(401).send({ message: "quantity is required " });
      case photo && photo.size > 100000:
        return res
          .status(401)
          .send({ message: "photo is required & less then 1 mb" });
    }

    const existingProduct = await productModel.findOne({ name });

    //existing user
    if (existingProduct) {
      return res.status(200).send({
        success: true,
        message: "Already Product exists",
      });
    }

    const products = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    console.log(products)
    res.status(200).send({
      success: true,
      message: "product created",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in product create",
    });
  }
};
//update product

const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, description, price, category, quantity, shipping } = req.fields;
  const { photo } = req.files;

  //validation
  switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is Required" });
    case !description:
      return res.status(500).send({ error: "Description is Required" });
    case !price:
      return res.status(500).send({ error: "Price is Required" });
    case !category:
      return res.status(500).send({ error: "Category is Required" });
    case !quantity:
      return res.status(500).send({ error: "Quantity is Required" });
   
    case photo && photo.size > 1000000:
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
  }
    
    const product = await productModel.findByIdAndUpdate(
      pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(200).send({
      success: true,
      message: "updated product successfully ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in Update product",
    });
  }
};

//getAll products

const getAllproductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "getAll products successfully ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getall products",
    });
  }
};

//single product get

const singleproductController = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single product get successfully ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single product",
    });
  }
};

//single photo get

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single product",
    });
  }
};

//delete product

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id).select("-photo");
    if (!product) {
      res.status(200).send({
        success: true,
        message: "delete product not exists  ",
        product,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "delete product successfully ",
        product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in delete product",
    });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  getAllproductsController,
  singleproductController,
  deleteProductController,
  productPhotoController,
};
