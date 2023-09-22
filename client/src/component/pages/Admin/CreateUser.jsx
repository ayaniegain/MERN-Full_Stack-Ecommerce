import React from 'react'
import Layout from "../../layout/Layout"
import AdminMenu from '../../layout/AdminMenu'

function CreateUser() {
  return (
    <Layout>
      <div className="flex col">
        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <div className="p-6 my-6">
          <h2>create User</h2>
        </div>
      </div>
    </Layout>
  )
}

export default CreateUser