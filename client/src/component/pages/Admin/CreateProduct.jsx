import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  let [categories, setcategories] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [quantity, setQuantity] = useState("");
  let [photo, setPhoto] = useState("");
  let [shipping, setShipping] = useState(false);

  async function getCatagoryApi() {
    try {
      let data = await axios.get(`/api/v1/category/getall-category`);
      setcategories(data?.data?.category);
    } catch (error) {
      toast.error("something went wrong in create Categories");
      console.log(error);
    }
  }

  useEffect(() => {
    getCatagoryApi();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        `/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product not created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">

        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <form onSubmit={handleCreate}>
          <section className="p-6 my-8 ">
            <h1 className="text-3xl pb-3">Create Product</h1>
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
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="file_input"
                type="file"
              />
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive h-52"
                  />
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Write a Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description here..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Product Price
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="$2000"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="shipping"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Shipping Status
              </label>
              <select
                id="shipping"
                onChange={(value) => {
                  setShipping(value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose an option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="my-3">
              <button
                type="submit"
                className="text-white bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
              >
                CREATE PRODUCT
              </button>
            </div>
          </section>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProduct;
