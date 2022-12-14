import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../libs/auth";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Admin() {
  const router = useRouter();

  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);

  useEffect(() => {
    if (userData.isAdmin == 0) router.push("/app");
  }, [userData]);

  return (
    <Layout view="default">
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">
              Welcome back, {userData != false ? userData.firstName : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-sgg-gray text-md">Make changes to the system here!</p>
          </div>
        </div>
        <div className="container grid grid-cols-1 gap-5 px-10 py-5 lg:grid-cols-2">
          <Link className="p-5 bg-white rounded-md shadow-2xl" href="/app/admin/deleteThings">
            <h6 className="font-semibold">Delete a thing from MongoDB</h6>
          </Link>
          <Link className="p-5 bg-white rounded-md shadow-2xl" href="/app/admin/addThings">
            <h6 className="font-semibold">Add a thing to MongoDB</h6>
          </Link>
          <Link className="p-5 bg-white rounded-md shadow-2xl" href="/app/admin/deleteUser">
            <h6 className="font-semibold">Delete a user from MySQL</h6>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
