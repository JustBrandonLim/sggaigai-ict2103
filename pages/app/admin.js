import { useState } from "react";

import Layout from "../../layouts/Layout";

export default function Admin() {
  const [profileData, setProfileData] = useState(null);

  return (
    <Layout loggedIn={true} view={"eat"} admin={true}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">
              Welcome back, {profileData ? profileData.name : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-sgg-gray text-md">What would you like to do today?</p>
          </div>
        </div>
        <div className="container grid grid-cols-1 gap-5 px-10 py-5 lg:grid-cols-2">
          <div className="p-5 bg-white rounded-md shadow-2xl">
            <h6 className="font-semibold">Delete an item from MongoDB</h6>
          </div>
          <div className="p-5 bg-white rounded-md shadow-2xl">
            <h6 className="font-semibold">Add an item to MongoDB</h6>
          </div>
          <div className="p-5 bg-white rounded-md shadow-2xl">
            <h6 className="font-semibold">Delete a user from MySQL</h6>
          </div>
        </div>
      </section>
    </Layout>
  );
}
