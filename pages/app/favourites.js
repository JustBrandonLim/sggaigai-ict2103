import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import { getLoggedIn, getUserData } from "../../libs/auth";
import FavouritesCard from "../../components/FavouritesCard";

export default function Favourites() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const [favouritesData, setFavouritesData] = useState([]);
  const [view, setView] = useState("eat");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);

  useEffect(() => {
    setFavouritesData([]);

    fetch(`/api/favourites/${view}?userID=${userData.email}`)
      .then((res) => res.json())
      .then((favouritesData) => {
        setFavouritesData(favouritesData);
        setIsLoading(false);
      });
  }, [view, userData]);

  async function handleDeleteClick(event, id) {
    event.preventDefault();

    await fetch("/api/favourites/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: userData.email, placeID: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result["results"] == true) {
          alert("Deleted from favourites!");
          router.reload(window.location.pathname);
        } else alert("Something went wrong!");
      });
  }

  return (
    <Layout view={view}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">
              Welcome back, {userData != false ? userData.firstName : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-sgg-gray text-md">Here are some of your favourite things!</p>
            <div className="flex flex-col min-w-full gap-5 mt-10 md:justify-between md:flex-row">
              <button
                className={`${
                  view == "eat" ? "bg-sgg-orange text-white" : "bg-inherit text-sgg-orange"
                } py-2 border-2 rounded-lg grow border-sgg-orange hover:bg-sgg-orange hover:text-white transition-colors duration-300`}
                onClick={() => setView("eat")}
              >
                What to <span className="font-semibold">EAT</span>
              </button>
              <button
                className={`${
                  view == "do" ? "bg-sgg-yellow text-white" : "bg-inherit text-sgg-yellow"
                } py-2 border-2 rounded-lg grow border-sgg-yellow hover:bg-sgg-yellow hover:text-white transition-colors duration-300`}
                onClick={() => setView("do")}
              >
                Things to <span className="font-semibold">DO</span>
              </button>
              <button
                className={`${
                  view == "stay" ? "bg-sgg-green text-white" : "bg-inherit text-sgg-green"
                } py-2 border-2 rounded-lg grow border-sgg-green hover:bg-sgg-green hover:text-white transition-colors duration-300`}
                onClick={() => setView("stay")}
              >
                Places to <span className="font-semibold">STAY</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-start min-h-full gap-5 px-10 py-5">
          {isLoading ? (
            [...Array(5)].map((data, i) => <FavouritesCard key={i} data={data} />)
          ) : favouritesData.length != 0 ? (
            favouritesData.map((data, i) => (
              <FavouritesCard key={i} userData={userData} data={data} view={view} handleDeleteClick={handleDeleteClick} />
            ))
          ) : (
            <p>No favourites added!</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
