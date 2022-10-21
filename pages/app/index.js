import { useState, useEffect } from "react";

import Layout from "../../layouts/Layout";

import Card from "../../components/Card";

export default function Home() {
  const [profileData, setProfileData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [view, setView] = useState("eat");

  useEffect(() => {
    /*fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data.message[0].name);
      });*/
  }, []);

  return (
    <Layout loggedIn={true} view={view}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20 md:px-0">
            <h2 className="flex items-center text-2xl">
              Welcome back, {profileData ? profileData.name : <div className="w-20 h-2 ml-2 bg-gray-500 rounded animate-pulse"></div>}.
            </h2>
            <p className="mt-5 text-gray-500 text-md">What would you like to do today?</p>
            <div className="flex flex-col min-w-full gap-5 mt-10 md:justify-between md:flex-row">
              <button
                className={`${
                  view == "eat" ? "bg-sgg-orange text-white" : "bg-inherit text-sgg-orange"
                } py-2 border-2 rounded-lg grow border-sgg-orange hover:bg-sgg-orange hover:text-white hover:transition-colors hover:duration-300`}
                onClick={() => setView("eat")}
              >
                What to <span className="font-semibold">EAT</span>
              </button>
              <button
                className={`${
                  view == "do" ? "bg-sgg-yellow text-white" : "bg-inherit text-sgg-yellow"
                } py-2 border-2 rounded-lg grow border-sgg-yellow hover:bg-sgg-yellow hover:text-white hover:transition-colors hover:duration-300`}
                onClick={() => setView("do")}
              >
                Things to <span className="font-semibold">DO</span>
              </button>
              <button
                className={`${
                  view == "stay" ? "bg-sgg-green text-white" : "bg-inherit text-sgg-green"
                } py-2 border-2 rounded-lg grow border-sgg-green hover:bg-sgg-green hover:text-white hover:transition-colors hover:duration-300`}
                onClick={() => setView("stay")}
              >
                Places to <span className="font-semibold">STAY</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-start min-h-full gap-5 px-5 py-5 md:px-0">
          {searchData ? searchData.name : [...Array(5)].map((i) => <Card key={i} loading={true} />)}
        </div>
      </section>
    </Layout>
  );
}
