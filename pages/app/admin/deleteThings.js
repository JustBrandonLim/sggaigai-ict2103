import { useRouter } from "next/router";
import Layout from "../../../layouts/Layout";
import { useState, useEffect } from "react";
import { getLoggedIn, getUserData } from "../../../libs/auth";

export default function deleteThings() {
  const router = useRouter();

  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);

  useEffect(() => {
    if (userData.isAdmin == 0) router.push("/app");
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault();
    const placeID = event.target.querySelector("#placeID").value;

    await fetch("/api/admin/deleteThings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeID: placeID }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["results"] == true) {
          alert("Deleted!");
          router.push("/");
        } else alert("Something went wrong!");
      });
  }

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
        <form className="p-5 bg-white rounded-md shadow-2xl" onSubmit={handleSubmit}>
          <h6 className="font-semibold">Delete a thing from MongoDB</h6>
          <input id="placeID" type="text" placeholder="R12345" className="w-2/5 p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
          <button type="submit" className="px-10 py-2 text-white transition-colors duration-150 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80">
            Delete
          </button>
        </form>
      </section>
    </Layout>
  );
}
