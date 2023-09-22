import React from 'react'
import UserMenu from '../../layout/UserMenu'
import Layout from '../../layout/Layout'

function Orders() {
  return (
    <Layout title={order}>
    <div className="flex col">
      <div className="mx-6 my-4">
        <UserMenu />
      </div>
      <div className="p-6 my-8">
        <h2>Orders</h2>
      </div>
    </div>
  </Layout>
  )
}

export default Orders