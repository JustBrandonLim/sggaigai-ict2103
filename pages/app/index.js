import { useState, useEffect } from "react";

import Layout from "../../layouts/Layout";

import Card from "../../components/AppCard";

export default function Home() {
  const [profileData, setProfileData] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [view, setView] = useState("eat");

  useEffect(() => {
    /*
     fetch(`/api/profile/${email}`)
          .then((res) => res.json())
          .then((profileData) => {
            setProfileData(profileData);
            console.log(profileData);
          });
    */
  }, []);

  useEffect(() => {
    setSearchData(null);

    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/api/search/${view}?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`)
          .then((res) => res.json())
          .then((searchData) => {
            setSearchData(searchData);
            console.log(searchData);
          });
      });
    else
      fetch(`/api/search/${view}?longitude=103.851959&latitude=1.290270`)
        .then((res) => res.json())
        .then((searchData) => {
          setSearchData(searchData);
          console.log(searchData);
        });
  }, [view]);

  return (
    <Layout loggedIn={true} view={view} admin={false}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">
              Welcome back, {profileData ? profileData.name : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-sgg-gray text-md">What would you like to do today?</p>
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
          {searchData
            ? searchData.map((data, i) => <Card key={i} data={data} view={view} />)
            : [...Array(5)].map((data, i) => <Card key={i} data={data} view={null} />)}
        </div>
      </section>
    </Layout>
  );
}
