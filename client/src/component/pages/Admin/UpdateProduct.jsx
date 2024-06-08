import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const param = useParams();
  const navigate = useNavigate();
  let [categories, setcategories] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [quantity, setQuantity] = useState("");
  let [photo, setPhoto] = useState("");
  let [id, setId] = useState("");

  // Get single product
  async function getSingleProduct() {
    try {
      let { data } = await axios.get(
        `/api/v1/product/single-product/${param.slug}`
      );

      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setQuantity(data?.product?.quantity);
      setCategory(data?.product?.category._id);
      setId(data?.product?._id);
    } catch (error) {
      console.log(error);
    }
  }

  // Get categories
  async function getCategories() {
    try {
      let { data } = await axios.get(`/api/v1/category/getall-category`);
      setcategories(data?.category);
    } catch (error) {
      toast.error("Something went wrong in updating categories");
      console.log(error);
    }
  }

  // Handle delete product
  const handleDelete = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      try {
        let { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
        if (data?.success) {
          toast.success("Product deleted successfully");
          navigate("/dashboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error(data?.message);
      }
    }
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">

        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <form onSubmit={handleUpdate}>
          <section className="p-6 my-8">
            <h1 className="text-3xl pb-3">Update Product</h1>
            <div>
              <label
                htmlFor="categories"
                className="block pb-1 mb-2 text-sm font-medium text-gray-900"
              >
                Select a Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="categories"
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose a Category</option>
                {categories.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="product_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="product_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div className="my-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload Image
              </label>
              <input
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="file_input"
                type="file"
              />
            </div>
            {id ? (
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive h-52"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/photo-product/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive h-52"
                    />
                  </div>
                )}
              </div>
            ) : (
              "Loading..."
            )}
            <div>
              <label
                htmlFor="product_description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Write a Description
              </label>
              <textarea
                id="product_description"
                rows={4}
                className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description here..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <label
                htmlFor="product_price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Product Price
              </label>
              <input
                type="number"
                id="product_price"
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="$2000"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="product_quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Quantity
              </label>
              <input
                type="number"
                id="product_quantity"
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="my-3">
              <button
                type="submit"
                className="text-white bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                UPDATE PRODUCT
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-red-700 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                DELETE PRODUCT
              </button>
            </div>
          </section>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateProduct;

