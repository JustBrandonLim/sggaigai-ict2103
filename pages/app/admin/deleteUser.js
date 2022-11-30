import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../../libs/auth";
import Layout from "../../../layouts/Layout";
import { useRouter } from "next/router";

export default function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState();
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
        <div className="flex justify-center gap-5 py-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-500 bg-white ">
            <thead className="text-xs text-gray-700 uppercase">
                <tr>
                    <th scope="col" className="px-6 py-3 text-sm bg-gray-50">ID</th>
                    <th scope="col" className="px-6 py-3 text-sm pr-52 bg-gray-50">Email</th>
                    <th scope="col" className="px-6 py-3 text-sm pr-52 bg-gray-50">First Name</th>
                    <th scope="col" className="px-6 py-3 text-sm pr-36 bg-gray-50">Last Name</th>
                    <th scope="col" className="px-6 py-3 text-sm bg-gray-50">Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((tuple, index) => (
                    <tr id={index+1}>
                        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{tuple.email}</th>
                        <td className="px-6 py-4 font-medium text-gray-900">{tuple.firstName}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{tuple.lastName}</td>
                        <td className="flex justify-center px-6 py-4">
                            <svg
                             onClick={(e) => (setShowModal(true), setToDelete(e))}
                             className="w-6 h-6 hover:cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      </section>

        {showModal && (
            <>
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                >
                    <div className="relative min-w-[360px] max-w-xs mx-auto my-6">
                        {/*content*/}
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-md shadow-lg outline-none focus:outline-none">
                            {/*body*/}
                            <div className="relative flex-auto px-5 py-6">
                                <div className="flex items-start justify-center">
                                    <div className="flex flex-col gap-2.5">
                                    <span className="inline text-lg font-medium leading-relaxed text-black">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 28" stroke-width="1.8" stroke="red" className="inline w-9 h-9">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                      </svg>
                                      <span className="p-1"></span>
                                        Delete User?</span>
                                        <div className="p-2">Are you sure you want to delete this user? This will permanently erase this user from the database</div>
                                    </div>
                                </div>                       
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end px-6 pb-6">
                                <button
                                    className="px-5 py-2 mb-1 mr-1 text-sm font-bold border-[#D9D9D9] border-2 bg-white hover:bg-gray-400 text-gray-500 rounded-sm transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                    type="button"
                                    onClick={() => { setShowModal(false) }}
                                >
                                  Cancel
                                </button>
                                <button
                                    className="px-5 py-2 mb-1 mr-1 text-sm font-bold border-[#D9D9D9] border-2 hover:bg-red-600 bg-red-600 text-white rounded-sm transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                    type="button"
                                    onClick={() => { setShowModal(false), deleteBtn(toDelete)}}
                                >
                                  Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>)}

    </Layout>
  );
}