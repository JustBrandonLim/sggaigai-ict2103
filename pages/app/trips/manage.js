import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import { useRouter } from "next/router";
import Layout from "../../../layouts/Layout";
import TripCardForm from "../../../components/TripCardForm";
import { getLoggedIn, getUserData } from "../../../libs/auth";
import PageHeader from "../../../components/PageHeader";
import Link from "next/link";

export default function Manage() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
  const [tripData, setTripData] = useState([])
  const [charCount, setCharCount] = useState(0);

  //get current user
  useEffect(() => {
    if (!getLoggedIn()) {
      router.push("/");
    }
    else {
      setUserData(getUserData());
    }
  }, []);

  //handles upon page start
  useEffect(() => {
    let user;
    if (!getLoggedIn()) {
      router.push("/");
    }
    else {
      user = getUserData();
      setUserData(getUserData());
    }

    const email = user.email;
    let date = (new URLSearchParams(window.location.search)).get("date");
    setselectedDate(date);
    fetch(`../../api/trips/trips?email=${email}&date=${date}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message.length != 0) {
          setTripData(result.message); //sets the new result
        }
        else {
          setTripData([])
        }
      });
  },[]);

  async function handleSubmit(event) {
    event.preventDefault();

    const stopName = event.target.querySelector("#stopname").value;
    const eventName = event.target.querySelector("#eventname").value;
    const Time = event.target.querySelector("#time").value;
    const Vicinity = event.target.querySelector("#Vicinity").value;

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, isAdmin: 0 }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["results"] == true) {
          alert("Account created!");
          router.push("/");
        } else alert("Something went wrong!");
      });
  }

  return (
    <Layout view={"trip"} loggedIn={true}>
      <section className="inline-block w-full bg-white">
        {/* <div className="container flex flex-col items-start justify-start gap-3 px-64 pt-20 pb-5">
              <h2 className="text-3xl font-semibold">Edit Trip</h2>
              <p className="text-sm text-gray-500 md:text-base">Edit your trip here</p>
          </div> */}
        <PageHeader breadCrumbItems={["Home", "View Trip", "Manage Trip"]} header="Manage Trip" description="Manage your trip here" />

        <section className="grid-flow-row bg-gray-100 md:grid edit-trip-grid-wrapper">
          <div className="flex flex-col items-center justify-start gap-3 py-10 mx-32">
            <div className="container flex flex-col items-center justify-start pb-5 md:items-start">
              <h3 className="text-xl font-medium">Current Trip</h3>
              <p className="text-sm text-gray-500 md:text-base">The current timeline for the selected date</p>
              <p className="text-sm text-gray-500 md:text-base">Select a stop to edit it!</p>
            </div>
            <div className="max-w-2xl gap-3">
              {[...Array(tripData.length)].map((e, i) => (
                <TripCardForm view={"edit"} tripData={tripData[i]} id={i} key={i} loading={false} />
              ))}
            </div>
          </div>
          <div className="px-20 py-10">
            <form className="flex flex-col justify-center h-full min-w-full text-justify bg-white border-2 rounded-md shadow-lg bs-gray-150">
              <div className="p-5 bg-gray-50">
                <h3 className="font-medium">Add a Stop to your Trip</h3>
              </div>
              <div className="flex-grow px-5 py-1">
              <div className="py-4 input-group">
                  <div className="flex flex-row pb-1">
                    <h4 className="w-2/3">Stop Name</h4>
                    <h4 className="w-1/3 pl-2">Type</h4>
                  </div>
                  <div className="flex flex-row gap-4 ">
                    <input type="text" placeholder="Stop Name" className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                    <input type="text" placeholder="Eat/Do/Stay" className="flex w-1/3 p-2 border-2 rounded-md input-group focus:outline-sgg-blue" required />
                  </div>
                </div>
                <div className="py-4 input-group">
                  <div className="flex flex-row pb-1">
                    <h4 className="w-2/3">Event Name</h4>
                    <h4 className="w-1/3 pl-2">Time</h4>
                  </div>
                  <div className="flex flex-row gap-4 ">
                    <input type="text" placeholder="Event Name" className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                    <input type="text" placeholder="Time" className="flex w-1/3 p-2 border-2 rounded-md input-group focus:outline-sgg-blue" required />
                  </div>
                </div>
                <div className="py-4 input-group">
                  <h4 className="pb-1">Vicinity</h4>
                  {/* <input type="text" placeholder="Vicinity" className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue" required /> */}
                  <textarea
                    placeholder="Vicinity"
                    maxLength="100"
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue"
                    required
                  />
                  <div className="text-right text-gray-300">{charCount} / 100</div>
                </div>
                <div className="py-4 input-group">
                  <div className="w-full h-3 border-b border-gray-300">
                    <div className="px-2 ml-4 bg-white w-fit">Additional Information</div>
                  </div>
                  <div className="flex flex-row pt-6 pb-3">
                    <div className="w-full">Price Level</div>
                    <div className="w-full">Contact</div>
                    <div className="w-full">Opening Hour</div>
                  </div>
                  <div className="flex flex-row text-gray-300">
                    <div className="w-full">string</div>
                    <div className="w-full">009009</div>
                    <div className="w-full">time</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end gap-0 px-5 py-5 bg-gray-50 md:flex-row md:gap-3">
                <Link href="/app/trips">
                  <p  className="text-sgg-blue hover:text-sgg-blue/80 hover:cursor-pointer">
                    Back
                  </p>
                </Link>
                <button
                  type="submit"
                  className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue"
                >
                  Create New Stop
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="flex flex-col items-center justify-end gap-2 px-40 py-10 md:flex-row md:gap-2"></div>
      </section>
    </Layout>
  );
}
