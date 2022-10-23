import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import Card from "../components/TripCard";
import EmptyTrip from "../components/EmptyTrip";
import Link from "next/link";
import PageHeader from "../components/PageHeader";


export default function CreateTrip() {
  const [dateTrip, setDateTrip] = useState("");
  const [tripData, setTripData] = useState(
    [
      [{date: "2022-11-20", stopName: "Breakfast", time: "09 00 a.m", action: "eat", eventName: "Mikasa Cafe", vicinity: "31 Ocean Way, #01-07" }],
      [{date: "2022-11-20", stopName: "Shopping", time: "11 00 a.m", action: "do", eventName: "Resort World Sentosa", vicinity: "RWS" }],
      [{date: "2022-11-20", stopName: "Lunch", time: "12 30 p.m", action: "eat", eventName: "Two Chefs Bar", vicinity: "31 Ocean Way, # 01 - 11 Quayside Isle" }],
      [{date: "2022-11-20", stopName: "Check In", time: "2 p.m", action: "stay", eventName: "The Barracks Hotel Sentosa", vicinity: "2 Gunner Lane" }],
      [{date: "2022-11-20", stopName: "Concert night!!", time: "06 00 p.m", action: "do", eventName: "Boys Like Girls Live In Singapore 2022: Self Title", vicinity: "The Coliseum (TM), Hard Rock Hotel Singapore, Resorts World (TM) Sentosa * Singapore" }],
      [{date: "2022-11-20", stopName: "Dinner", time: "09 00 p.m", action: "eat", eventName: "Wing Choi", vicinity: "8 Sentosa Gateway" }]
    ]
  ); // sample results from database
  useEffect(() => {
    
  }, [dateTrip]);
  return (
    <Layout view={"trip"} loggedIn={true}>

      <section className="inline-block w-full bg-white">
        <PageHeader
          breadCrumbItems={['Home', 'View Trip']}
          header='Your Trip'
          description='View your planned trips here'
        >
          <div className="flex flex-row">
            <span className="mr-1 text-red-500">*</span>
            <p className="mr-2 text-xs md:text-base">Select a date to view the trips :</p>
              <input className="border-2 border-gray-300 rounded-md" type="date" onChange={(e) => setDateTrip({startDate: e.target.value})}/>
          </div>
        </PageHeader>

        <div className="flex flex-col items-center justify-start gap-3 px-40 py-10 bg-gray-100">
          <div className="max-w-2xl gap-3">
            {tripData[0][0].date != dateTrip.startDate ? <EmptyTrip/> : [...Array(tripData.length)].map((e, i) => <Card tripData={tripData[i]} id={i} key={i} loading={true} />)}
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
