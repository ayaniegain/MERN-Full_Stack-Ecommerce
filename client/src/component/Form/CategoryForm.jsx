import React from "react";

function CategoryForm({ value, setValue, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Category"
            type="text"
            id="first_name"
            className= "bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button
            className="bg-sky-900 text-white  active:bg-sky-900 font-bold h-9 w-20 m-2 uppercase text-xs  py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
      <div></div>
    </>
  );
}

export default CategoryForm;
