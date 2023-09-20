import React from 'react'
import Layout from '../layout/Layout'
import  {useContextData}  from "../context/useAuth";

function Home() {
  // let [auth,setAuth] =useContextData()

  // console.log(auth)

  return (
    <Layout title={"Home"}>
      {/* <pre>{JSON.stringify(auth)}</pre> */}
      <h2>Home</h2>
    </Layout>
  )
}

export default Home