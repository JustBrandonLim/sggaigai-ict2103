import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../../libs/auth";
import Layout from "../../../layouts/Layout";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  const [userData, setUserData] = useState(false);
  const [state, setState] = useState(false);
  //get the users
  const [users , setUsers] = useState([]);
  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);

  useEffect(() => {
    if (userData.isAdmin == 0) router.push("/app");
    fetch(`../../api/admin/getUser`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message.length != 0) {
          setUsers(result.message); //sets the new result
        }
        else {
          setUsers([]);
        }
      });
  }, [state]);

  const deleteBtn = (event) => {
    const Data = event.target.parentNode.parentNode.innerText.split("\t");
    const email = Data[2];
    console.log(email);
    fetch("../../api/admin/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email}),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result["results"] == true) {
            alert("Account deleted!");
            if (state == false ){setState(true);}
            else {setState(false);}
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
        <div class="container grid grid-cols-1 gap-5 px-10 py-5 content-center">
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg  ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-900">
                <tr>
                    <th scope="col" class="py-3 px-6">Delete</th>
                    <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">#</th>
                    <th scope="col" class="py-3 px-6">Email</th>
                    <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">First Name</th>
                    <th scope="col" class="py-3 px-6">Last Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map((tuple, index) => (
                    <tr id={index+1}>
                        <td class="py-4 px-6">
                            <button
                                type="button" 
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                value="Delete"
                                onClick={deleteBtn}
                            >DELETE
                            </button>
                        </td>
                        <td class="py-4 px-6 bg-gray-50 font-medium text-gray-900 dark:bg-gray-800">{index + 1}</td>
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{tuple.email}</th>
                        <td class="py-4 px-6 bg-gray-50 font-medium text-gray-900 dark:bg-gray-800">{tuple.firstName}</td>
                        <td class="py-4 px-6 font-medium text-gray-900">{tuple.lastName}</td>
                    </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}