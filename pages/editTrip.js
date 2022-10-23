import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import Card from "../components/TripCard";
import Link from "next/link";

export default function EditTrip() {
    const [tripData, setTripData] = useState(
        [
        [{stopName: "Breakfast", time: "09 00 a.m", action: "eat", eventName: "Mikasa Cafe", vicinity: "31 Ocean Way, #01-07"}],
        [{stopName: "Shopping", time: "11 00 a.m", action: "do", eventName: "Resort World Sentosa", vicinity: "RWS"}],
        [{stopName: "Lunch", time: "12 30 p.m", action: "eat", eventName: "Two Chefs Bar", vicinity: "31 Ocean Way, # 01 - 11 Quayside Isle"}],
        [{stopName: "Check In", time: "2 p.m", action: "stay", eventName: "The Barracks Hotel Sentosa", vicinity: "2 Gunner Lane"}],
        [{stopName: "Concert night!!", time: "06 00 p.m", action: "do", eventName: "Boys Like Girls Live In Singapore 2022: Self Title", vicinity: "The Coliseum (TM), Hard Rock Hotel Singapore, Resorts World (TM) Sentosa * Singapore"}],
        [{stopName: "Dinner", time: "09 00 p.m", action: "eat", eventName: "Wing Choi", vicinity: "8 Sentosa Gateway"}]
        ]
    ); // sample results from database

    useEffect(() => {

    }, []);

  return (
    <Layout view={"trip"} loggedIn={true}>
        <section className="container inline-block bg-white">
          <div className="container flex flex-col items-start justify-start gap-3 px-64 pt-20 pb-5">
              <h2 className="text-3xl font-semibold">Edit Trip</h2>
              <p className="text-sm text-gray-500 md:text-base">Edit your trip here</p>
          </div>
          
          <section className="grid grid-flow-row grid-cols-2">
            <div className="flex flex-col items-center justify-start gap-3 px-40 py-10 bg-gray-200">
              <div className="container flex flex-col items-start justify-start pb-5">
                      <h3 className="text-xl font-medium">Current Trip</h3>
                      <p className="text-sm text-gray-500 md:text-base">The current timeline for the selected date</p>
              </div>
              <div className="max-w-2xl gap-3">
                {false ? tripData.trip : [...Array(tripData.length)].map((e, i) => <Card view={"edit"} tripData={tripData[i]} id={i} key={i} loading={true} />)}
              </div>              
            </div>
                <div className="gap-3 px-40 py-10 pl-0 bg-gray-200">
                    <form className="justify-center min-w-full py-5 text-justify bg-gray-100 border-2 rounded-md shadow-xl bs-gray-150">
                      <h3 className="font-medium">Stop selected</h3>
                        <div className="grid grid-flow-row grid-cols-1 px-5 py-1 bg-white">
                          <h4>Stop Name</h4>
                          <input type="text" placeholder="Stop Name" className="p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                            <div className="grid grid-flow-row grid-cols-2 px-2 py-1">
                              <h4>Event Name</h4>
                              <h4>Time</h4>
                            </div>
                            <div className="flex flex-col items-center justify-between gap-0 md:flex-row md:gap-0">
                              <input type="text" placeholder="Event Name" className="w-1/2 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                              <input type="text" placeholder="Time" className="w-1/2 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                            </div>
                            <h4>Vicinity</h4>
                            <input type="text" placeholder="Vicinity" className="p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                        </div>
                        <div className="flex flex-col items-center justify-end gap-0 px-4 pt-5 pb-0 md:flex-row md:gap-3">
                        <a href="/trip" className="text-sgg-blue hover:text-sgg-blue/80 hover:cursor-pointer">
                            Back
                        </a>
                        <button type="submit" className="px-10 py-2 transition-colors duration-150 bg-white border-2 rounded-sm text-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
                            Create New Stop
                        </button>
                        <button type="submit" onClick={() => setStatus("edit")} className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
                            Save Edits
                        </button>
                        </div>
                    </form>
                </div>
          </section>
          
            <div className="flex flex-col items-center justify-end gap-2 px-40 py-10 md:flex-row md:gap-2">

            </div>
      </section>
  </Layout>
  )
}
