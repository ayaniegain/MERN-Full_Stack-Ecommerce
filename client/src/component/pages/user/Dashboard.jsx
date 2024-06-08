import React from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../context/useAuth";
import UserMenu from "../../layout/UserMenu";

function Dashboard() {
  let [auth] = useAuth();
  return (
    <Layout>
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">
        <div className="mx-6 my-4">
          {" "}
          <UserMenu />
        </div>
        <div className="mx-6 my-16">
          <div className="block max-w-[18rem] rounded-lg border border-success bg-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="border-b-2 text-3xl border-success px-6 py-3 text-neutral-600">
              {auth?.user?.name}
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-success">
                Email: {auth?.user?.email}
              </h5>

              <h5 className="mb-2 text-xl font-medium leading-tight text-success">
                Contact: {auth?.user?.phone}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
