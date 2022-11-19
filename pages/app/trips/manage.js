import { useState, useEffect, useReducer } from "react";
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
  const [favouritesEat, setFavouritesEat] = useState(
      [
        {eventName: "Mikasa Cafe", vicinity: "31 Ocean Way, #01-07", price_level: "5", contact: "98552232", opening_hour: "6-9"}
      ]
    );
  const [favouritesDo, setFavouritesDo] = useState(
      [
        {eventName: "Resort World Sentosa", vicinity: "RWS", price_level: "5", contact: "42142142", opening_hour: "1-5"}
      ]
  );
    const [favouritesStay, setFavouritesStay] = useState(
      [
        {eventName: "The Barracks Hotel Sentosa", vicinity: "2 Gunner Lane", contact: "12332322"}
      ]
  );
  const [eventName, setEventName] = useState("Event");
  const [vicinity, setVicinity] = useState("Vicinity");
  const [priceLevel, setPriceLevel] = useState("-");
  const [contact, setContact] = useState("-");
  const [openingHour, setOpeningHour] = useState("-");
  const [selectedDate, setselectedDate] = useState("");
  const [tripData, setTripData] = useState([]);
  const [tab, setTab] = useState(["Places to EAT", "Places to DO", "Places to STAY"]);
  const [tabIndex, setTabIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  //get data from favourites
  useEffect(() => {
  setEventName(favouritesDo["stopName"]);
  setVicinity(favouritesDo["vicinity"]);
  }, []);


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
                  </div>
                  <div className="flex flex-row gap-4 ">
                    <input type="text" placeholder="Stop Name" className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                    <button onClick={()=> setShowModal(true)} type="button" className="flex w-1/3 px-10 py-2 text-sm font-medium transition-colors duration-150 bg-white border-2 rounded-sm text-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue" required>Select From Favourites</button>
                  </div>
                </div>
                <div className="py-4 input-group">
                  <div className="flex flex-row pb-1">
                    <h4 className="w-2/3">Event Name</h4>
                    <h4 className="w-1/3 pl-2">Time</h4>
                  </div>
                  <div className="flex flex-row gap-4 ">
                    <input type="text" value={eventName} className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" disabled />
                    <input type="time" placeholder="Time" className="flex w-1/3 p-2 border-2 rounded-md input-group focus:outline-sgg-blue" required />
                  </div>
                </div>
                <div className="py-4 input-group">
                  <h4 className="pb-1">Vicinity</h4>
                  <textarea
                    value={vicinity}
                    className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue"
                    disabled
                  />
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
                  <div className="flex flex-row text-black">
                    <input type="text" className="w-full" value={priceLevel} disabled/>
                    <input type="text" className="w-full" value={contact} disabled/>
                    <input type="text" className="w-full" value={openingHour} disabled/>
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

      {showModal && (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                    >
                        <div className="relative min-w-[640px] max-w-md mx-auto my-6">
                            {/*content*/}
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-md shadow-lg outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative flex-auto py-6 px-7">
                                        <div className="flex flex-col">
                                            <p className="inline text-lg font-medium leading-relaxed text-black">Select Stop from Favourites</p>
                                            <div>
                                                <div className="py-3">
                                                    <button onClick={() => setTabIndex(0)} className={`${tab[tabIndex] == tab[0] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black" } text-sm`}>{`${tab == 'null' ? "" : tab[0] }`}</button>
                                                    <button onClick={() => setTabIndex(1)} className={`${tab[tabIndex] == tab[1] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black" } mx-10 text-sm`}>{`${tab == 'null' ? "" : tab[1] }`}</button>
                                                    <button onClick={() => setTabIndex(2)} className={`${tab[tabIndex] == tab[2] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black" } text-sm`}>{`${tab == 'null' ? "" : tab[2] }`}</button>
                                                </div>
                                              <div className={`${ tab[tabIndex] == "Places to EAT" ? "visible" : "hidden"} bg-#f0f2f5`}>
                                                <ol className="flex flex-col items-start justify-start">
                                                  <div className="w-full gap-3">
                                                  {[...Array(favouritesDo.length)].map((e,i) => <div onClick={()=> (setShowModal(false) ,setEventName(favouritesDo[i]["eventName"], 
                                                  setVicinity(favouritesDo[i]["vicinity"]), setPriceLevel(favouritesDo[i]["price_level"]), setContact(favouritesDo[i]["contact"]), setOpeningHour(favouritesDo[i]["opening_hour"])))} className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60" id={e} key={i}> {favouritesDo[i]["eventName"]} </div>)}
                                                  </div>
                                                </ol>
                                              </div>
                                              <div className={`${ tab[tabIndex] == "Places to DO" ? "visible" : "hidden"} bg-#f0f2f5`}>
                                                <ol className="flex flex-col items-start justify-start">
                                                  <div className="w-full gap-3">
                                                  {[...Array(favouritesEat.length)].map((e,i) => <div onClick={()=> (setShowModal(false) ,setEventName(favouritesEat[i]["eventName"], 
                                                  setVicinity(favouritesEat[i]["vicinity"]), setPriceLevel(favouritesEat[i]["price_level"]), setContact(favouritesEat[i]["contact"]), setOpeningHour(favouritesEat[i]["opening_hour"])))} className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60" id={e} key={i}> {favouritesEat[i]["eventName"]} </div>)}
                                                  </div>
                                                </ol>
                                              </div>
                                              <div className={`${ tab[tabIndex] == "Places to STAY" ? "visible" : "hidden"} bg-#f0f2f5`}>
                                                <ol className="flex flex-col items-start justify-start">
                                                  <div className="w-full gap-3">
                                                  {[...Array(favouritesStay.length)].map((e,i) => <div onClick={()=> (setShowModal(false) ,setEventName(favouritesStay[i]["eventName"], 
                                                  setVicinity(favouritesStay[i]["vicinity"]), setContact(favouritesStay[i]["contact"])))} className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60" id={e} key={i}> {favouritesStay[i]["eventName"]} </div>)}
                                                  </div>
                                                </ol>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                <div className="flex items-center justify-end px-6 pb-6">
                                        <button
                                            className="py-2 mb-1 ml-2 mr-1 text-sm text-black transition-all duration-150 ease-linear border-2 rounded-sm shadow outline-none px-7 hover:bg-black/40 hover:shadow-lg focus:outline-none"
                                            type="button"
                                            onClick={() => {setShowModal(false)}}
                                        >
                                          Back
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            )}
    </Layout>
  );
}
