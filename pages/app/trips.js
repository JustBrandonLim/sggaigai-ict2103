import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import Card from "../../components/TripCard";
import EmptyTrip from "../../components/EmptyTrip";
import Link from "next/link";
import { getLoggedIn, getUserData } from "../../libs/auth";
import PageHeader from "../../components/PageHeader";

export default function Trips() {
  function getCurrDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let now = yyyy +'-'+ mm +'-'+ dd;
    return now
  }

  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const [dateTrip, setDateTrip] = useState({ startDate: getCurrDate() });
  const [firstTime, setFirstTime] = useState(true);
  const [tripData, setTripData] = useState([]);
  useEffect(() => {
    if (!getLoggedIn()) {
      router.push("/");
    }
    else {
      if (firstTime){
        setUserData(getUserData());
        setDateTrip({startDate: getCurrDate()});
        setFirstTime(false);
      }
    }
  }, []);

  //handles finding of data on data change
  useEffect(() => {
    //event.preventDefault();
    // console.log(incr_date(dateTrip.startDate));
    const email = userData.email;
    const date = dateTrip.startDate;
    fetch(`../api/trips/trips?email=${email}&date=${date}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message.length != 0) {
          setTripData(result.message); //sets the new result
        }
        else {
          setTripData([])
        }
      });
  }, [dateTrip]);
  
  //exporting data to the next page
  function selectedDate() {
    window.location.href = "/app/trips/manage?date=" + dateTrip.startDate;
  }

  function incr_date(date_str) {
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setDate(dt.getDate() + 1);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }

  return (
    <Layout view={"trip"} loggedIn={true}>
      <section className="inline-block w-full bg-white">
        <PageHeader breadCrumbItems={["Home", "View Trip"]} header="Your Trip" description="View your planned trips here">
          <div className="flex flex-row">
            <span className="mr-1 text-red-500">*</span>
            <p className="mr-2 text-xs md:text-base">Select a date to view the trips :</p>
            <input
              className="border-2 border-gray-300 rounded-md"
              value={dateTrip.startDate}
              type="date"
              onChange={(e) => setDateTrip({ startDate: e.target.value })}
            />
          </div>
        </PageHeader>

        <ol className="flex flex-col items-center justify-start gap-3 px-40 py-10 bg-gray-100">
          <div className="max-w-2xl gap-3">
            {tripData.length == 0 ? (
              <EmptyTrip />
            ) : (
              [...Array(tripData.length)].map((e, i) => <Card tripData={tripData[i]} id={i} key={i} loading={false} />)
            )}
          </div>
        </ol>

        <div className="flex flex-col items-center justify-end gap-2 px-40 py-10 md:flex-row md:gap-2">
          <button
            onClick={() => setDateTrip({ startDate: incr_date(dateTrip.startDate) })}
            type="submit"
            className="px-6 py-2 transition-colors duration-150 bg-white border-2 rounded-smpx-10 text-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue"
          >
            Next Day
          </button>
          <Link href={{pathname: '/app/trips/manage', query: {date: dateTrip.startDate}}}>
            <button className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
              Create / Edit Trip
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
