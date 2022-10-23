import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import Card from "../components/TripCard";
import Link from "next/link";

export default function CreateTrip() {
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
    /*fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data.message[0].name);
      });*/
  }, []);

  return (
    <Layout view={"trip"} loggedIn={true}>
        <section className="container inline-block bg-white">
          <div className="container flex flex-col items-start justify-start gap-3 px-64 pt-20 pb-5">
              <h2 className="text-3xl font-semibold">Your Trip</h2>
              <p className="text-sm text-gray-500 md:text-base">View your planned trips here</p>
              <div className="flex flex-row">
                  <span className="mr-1 text-red-500">*</span>
                  <p className="mr-2 text-xs md:text-base">Select a date to view the trips :</p>
                  <input className="border-2 rounded-sm" type="date" value="2022-01-01" min="2022-01-01" max="2022-12-31"/>
              </div>
          </div>

            <div className="flex flex-col items-center justify-start gap-3 px-40 py-10 bg-gray-100">
              <div className="max-w-2xl gap-3">
                {false ? tripData.trip : [...Array(tripData.length)].map((e, i) => <Card tripData={tripData[i]} id={i} key={i} loading={true} />)}
              </div> 
            </div>             
            
              <div className="flex flex-col items-center justify-end gap-2 px-40 py-10 md:flex-row md:gap-2">
                <button type="submit" className="px-6 py-2 transition-colors duration-150 bg-white border-2 rounded-smpx-10 text-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
                    Next Day
                </button>
                <Link href="/editTrip">
                  <button type="submit" className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
                      Create / Edit Trip
                  </button>
                </Link>
              </div>  
      </section>
  </Layout>
  )
}
