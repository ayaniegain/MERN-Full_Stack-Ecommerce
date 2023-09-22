import React from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../../layout/AdminMenu'

function CreateProduct () {
  return (
    <Layout>
    <div className="flex col">
      <div className="mx-6 my-4">
        <AdminMenu />
      </div>
      <div className="p-6 my-8">

        <h2>product</h2>
      </div>
    </div>
  </Layout>
  )
}

export default CreateProduct 