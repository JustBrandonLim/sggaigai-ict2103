import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../libs/auth";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);
  return (
    <Layout view="default">
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">
              Welcome back, {userData != false ? userData.firstName : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-sgg-gray text-md">Make changes to your account here!</p>
          </div>
        </div>
        <div className="container flex justify-center gap-5 px-10 py-5">
          <div className="w-full max-w-lg p-5 bg-white rounded-md shadow-2xl">
            <h6 className="font-semibold">Change Password</h6>
            <div className="flex flex-col gap-5 mt-10">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
              />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
              />
              <button type="submit" className="px-5 py-2 text-white transition-colors duration-150 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
