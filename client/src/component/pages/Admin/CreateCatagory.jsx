import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Form/CategoryForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateCatagory() {
  let [category, setCategory] = useState([]);
  let [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  let [updatedName, setupdatedName] = useState("");

  
  async function getCatagoryApi() {
    try {
      let data = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/getall-category`
      );
      setCategory(data?.data?.category);
    } catch (error) {
      toast.error("something went wrong in create Categories");
      console.log(error);
    }
  }
  async function deleteHandler(id = null) {
    try {
      if (id) {
        await axios.delete(
          `${
            import.meta.env.VITE_REACT_APP_API
          }/api/v1/category/delete-category/${id}`
        );
      }
      getCatagoryApi();
      // setCategory(data?.data?.category)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let data = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );

      if (data) {
        toast.success(`${name} is created`);
        getCatagoryApi();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in input form ");

      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const data = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setShow(false);
      getCatagoryApi();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCatagoryApi();
  }, []);

  return (
    <Layout>
      <div className="flex col">
        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <div className="p-6 my-8">
        <h1 className="text-3xl pb-4">Create Category</h1>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Categories
                  </th>
                  <th scope="col" className="px-6 py-3">
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category?.map((e) => (
                  <tr
                    key={e._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.name}
                    </th>
                    <td className="px-6 py-4  ">
                      <button
                        className="text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-tbg-teal-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2"
                        onClick={() => {
                          setShow(true);
                          setupdatedName(e.name);
                          setSelected(e);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2"
                        onClick={() => deleteHandler(e._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal show={show} onHide={() => setShow(false)} footer={null}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex ">
              <CategoryForm
                value={updatedName}
                setValue={setupdatedName}
                handleSubmit={handleUpdate}
              />
              <Button
                variant="secondary"
                className="bg-red-900 text-white  active:bg-sky-900 font-bold h-9 w-20 m-2 uppercase text-xs 
                 py-2 rounded-full"
                onClick={() => setShow(false)}
              >
                close
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCatagory;