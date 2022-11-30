import { useState, useEffect } from "react";
import { useRouter } from "next/router";
let strokeColor = "orange";
let activeColor = "grey";

export default function TripCardForm(props) {
  const [activeNode, setActiveNode] = useState(-1);
  const [favouritesEat, setFavouritesEat] = useState(props.favouriteEat);
  const [favouritesDo, setFavouritesDo] = useState(props.favouriteDo);
  const [favouritesStay, setFavouritesStay] = useState(props.favouriteStay);
  const [eventName, setEventName] = useState("Event");
  const [vicinity, setVicinity] = useState("Vicinity");
  const [priceLevel, setPriceLevel] = useState("-");
  const [contact, setContact] = useState("-");
  const [openingHour, setOpeningHour] = useState("-");
  const [tab, setTab] = useState(["Places to EAT", "Places to DO", "Places to STAY"]);
  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tripID, setTripID] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [stopName, setStopName] = useState("");
  const [placeID, setPlaceID] = useState("");

  useEffect(() => {
    setFavouritesEat(props.favouriteEat);
    setFavouritesDo(props.favouriteDo);
    setFavouritesStay(props.favouriteStay);
  }, []);

  //converts mySQL time to a 12 hour format
  function convertTo12Time(timing) {
    if (timing) {
      const timeArray = timing.split(":");
      let hour = parseInt(timeArray[0]);
      let AMorPM = " am";
      if (parseInt(timeArray[0]) > 12) {
        hour -= 12;
        AMorPM = " pm";
      }
      const time = hour.toString() + ":" + timeArray[1].toString() + AMorPM;
      return time;
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (eventName === "Event") {
      alert("Please choose a place!");
    } else {
      let time = formatTime(stopTime);
      let type = getEventType(placeID);

      await fetch("../../api/trips/editTrips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: tripID,
          stop_name: stopName,
          stop_time: time,
          place_name: eventName,
          place_address: vicinity,
          place_type: type,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert("Changed!");
            window.location.reload();
          } else {
            alert("Error changing item");
          }
        });
    }
  };

  //get the event type
  function getEventType(place) {
    if (place.indexOf("E") > -1) {
      return "DO";
    } else if (place.indexOf("R") > -1) {
      return "EAT";
    } else {
      return "STAY";
    }
  }

  //Formatting the time
  function formatTime(time) {
    let hour = parseInt(time.slice(0, 2));
    let mins = time.slice(3, 5);
    if (time.indexOf("PM") > -1) {
      hour += 12;
    }
    let timing = hour + ":" + mins + ":00";
    return timing;
  }

  if (activeNode == props.id) {
    switch (props.tripData["place_type"]) {
      case "EAT":
        activeColor = "#CC715A";
        break;
      case "DO":
        activeColor = "#C99F38";
        break;
      case "STAY":
        activeColor = "#264653";
        break;
      default:
        activeColor = "#CC715A";
    }
  } else {
    activeColor = "grey";
  }

  switch (props.tripData["place_type"]) {
    case "EAT":
      strokeColor = "#CC715A";
      break;
    case "DO":
      strokeColor = "#C99F38";
      break;
    case "STAY":
      strokeColor = "#264653";
      break;
    default:
      strokeColor = "#CC715A";
  }
  if (props.loading)
    return (
      // removed grid-cols-3
      <div className="flex flex-col items-center justify-center gap-5 align-middle animate-pulse">
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="8" stroke="orange" strokeWidth="6" fill="white" />
        </svg>
        <div className="hidden sm:flex w-0.5 bg-gray-200 h-full m-auto"></div>
      </div>
    );
  else
    return (
      <>
        <li
          className="grid grid-cols-1 py-2 md:grid-flow-row trip-grid-wrapper"
          onClick={() => (activeNode != -1 ? setActiveNode(-1) : setActiveNode(props.id))}
        >
          <div className="relative flex-row text-center md:text-right whitespace-nowrap">
            <p className="font-bold">{props.tripData["stop_name"]}</p>
            <p className="">{convertTo12Time(props.tripData["stop_time"])}</p>
          </div>
          <div className="flex flex-col items-center justify-center md:block">
            <svg className={`${props.id == activeNode ? "animate-pulse" : ""} timeline-circle`} height="20" width="60">
              <circle cx="50" cy="10" r="5" stroke={`${props.view == "edit" ? activeColor : strokeColor}`} strokeWidth="3" fill="white" />
            </svg>
            <div className="hidden md:flex w-0.5 bg-gray-200 h-full m-auto"></div>
          </div>
          <div className="text-center break-words md:text-left">
            <p className="font-bold">{props.tripData["place_name"]}</p>
            <p className="">{props.tripData["place_address"]}</p>
          </div>
        </li>
        {/* ----------------------------------HERE IS THE POPUP MENU FOR EDITING-------------------------------------------------- */}
        {activeNode == props.id ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
              <div className="relative w-full max-w-5xl mx-auto my-6">
                <div className="relative flex items-center justify-start px-20 py-10">
                  <form className="flex flex-col justify-center h-full min-w-full text-justify bg-white border-2 rounded-md shadow-lg bs-gray-150">
                    <div className="p-5 bg-gray-50">
                      <h3 className="font-medium">
                        Editing {props.tripData["stop_name"]} at {props.tripData["place_name"]}
                      </h3>
                    </div>
                    <div className="flex-grow px-5 py-1">
                      <div className="py-4 input-group">
                        <div className="flex flex-row pb-1">
                          <h4 className="w-2/3">Stop Name</h4>
                        </div>
                        <div className="flex flex-row gap-4 ">
                          <input
                            type="text"
                            placeholder="Stop Name"
                            onChange={(e) => setStopName(e.target.value)}
                            className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue"
                            required
                          />
                          <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            className="flex w-1/3 px-10 py-2 text-sm font-medium text-center transition-colors duration-150 bg-white border-2 rounded-sm text-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue"
                            required
                          >
                            Select From Favourites
                          </button>
                        </div>
                      </div>
                      <div className="py-4 input-group">
                        <div className="flex flex-row pb-1">
                          <h4 className="w-2/3">Event Name</h4>
                          <h4 className="w-1/3 pl-2">Time</h4>
                        </div>
                        <div className="flex flex-row gap-4 ">
                          <input type="text" value={eventName} className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" disabled />
                          <input
                            type="time"
                            placeholder="Time"
                            onChange={(e) => setStopTime(e.target.value)}
                            className="flex w-1/3 p-2 border-2 rounded-md input-group focus:outline-sgg-blue"
                            required
                          />
                        </div>
                      </div>
                      <div className="py-4 input-group">
                        <h4 className="pb-1">Vicinity</h4>
                        <textarea value={vicinity} className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue" disabled />
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
                          <input type="text" className="w-full" value={priceLevel} disabled />
                          <input type="text" className="w-full" value={contact} disabled />
                          <input type="text" className="w-full" value={openingHour} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-0 px-5 py-5 bg-gray-50 md:flex-row md:gap-3">
                      <p onClick={() => setActiveNode(-1)} className="text-sgg-blue hover:text-sgg-blue/80 hover:cursor-pointer">
                        Back
                      </p>
                      <button
                        onClick={handleClick}
                        className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue"
                      >
                        Save Edits
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}

        {showModal && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative min-w-[640px] max-w-md mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-md shadow-lg outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative flex-auto py-6 px-7">
                    <div className="flex flex-col">
                      <p className="inline text-lg font-medium leading-relaxed text-black">Select Stop from Favourites</p>
                      <div>
                        <div className="py-3">
                          <button
                            onClick={() => setTabIndex(0)}
                            className={`${tab[tabIndex] == tab[0] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black"} text-sm`}
                          >{`${tab == "null" ? "" : tab[0]}`}</button>
                          <button
                            onClick={() => setTabIndex(1)}
                            className={`${
                              tab[tabIndex] == tab[1] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black"
                            } mx-10 text-sm`}
                          >{`${tab == "null" ? "" : tab[1]}`}</button>
                          <button
                            onClick={() => setTabIndex(2)}
                            className={`${tab[tabIndex] == tab[2] ? "text-blue-600 font-bold border-b-2 border-indigo-500" : "text-black"} text-sm`}
                          >{`${tab == "null" ? "" : tab[2]}`}</button>
                        </div>
                        <div className={`${tab[tabIndex] == "Places to EAT" ? "visible" : "hidden"} bg-#f0f2f5`}>
                          <ol className="flex flex-col items-start justify-start">
                            <div className="w-full gap-3">
                              {[...Array(props.favouriteEat.length)].map((e, i) => (
                                <div
                                  onClick={() => (
                                    setShowModal(false),
                                    setEventName(props.favouriteEat[i]["name"]),
                                    setVicinity(props.favouriteEat[i]["vicinity"]),
                                    setPriceLevel(props.favouriteEat[i]["price_level"]),
                                    setContact(props.favouriteEat[i]["phone_number"]),
                                    setOpeningHour(props.favouriteEat[i]["opening_hour"]),
                                    setPlaceID(props.favouriteEat[i]["ID"]),
                                    setTripID(props.tripData["trip_id"])
                                  )}
                                  className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60"
                                  id={e}
                                  key={i}
                                >
                                  {" "}
                                  {props.favouriteEat[i]["name"]}{" "}
                                </div>
                              ))}
                            </div>
                          </ol>
                        </div>
                        <div className={`${tab[tabIndex] == "Places to DO" ? "visible" : "hidden"} bg-#f0f2f5`}>
                          <ol className="flex flex-col items-start justify-start">
                            <div className="w-full gap-3">
                              {[...Array(props.favouriteDo.length)].map((e, i) => (
                                <div
                                  onClick={() => (
                                    setShowModal(false),
                                    setEventName(props.favouriteDo[i]["name"]),
                                    setVicinity(props.favouriteDo[i]["vicinity"]),
                                    setPriceLevel(props.favouriteDo[i]["price_level"]),
                                    setContact(props.favouriteDo[i]["phone_number"]),
                                    setOpeningHour(props.favouriteDo[i]["opening_hour"]),
                                    setPlaceID(props.favouriteDo[i]["ID"]),
                                    setTripID(props.tripData["trip_id"])
                                  )}
                                  className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60"
                                  id={e}
                                  key={i}
                                >
                                  {" "}
                                  {props.favouriteDo[i]["name"]}{" "}
                                </div>
                              ))}
                            </div>
                          </ol>
                        </div>
                        <div className={`${tab[tabIndex] == "Places to STAY" ? "visible" : "hidden"} bg-#f0f2f5`}>
                          <ol className="flex flex-col items-start justify-start">
                            <div className="w-full gap-3">
                              {[...Array(props.favouriteStay.length)].map((e, i) => (
                                <div
                                  onClick={() => (
                                    setShowModal(false),
                                    setEventName(props.favouriteStay[i]["name"]),
                                    setVicinity(props.favouriteStay[i]["vicinity"]),
                                    setContact(props.favouriteStay[i]["phone_number"]),
                                    setPlaceID(props.favouriteStay[i]["ID"]),
                                    setTripID(props.tripData["trip_id"])
                                  )}
                                  className="pt-4 pb-1 border-b-2 hover:cursor-pointer hover:text-black/60"
                                  id={e}
                                  key={i}
                                >
                                  {" "}
                                  {props.favouriteStay[i]["name"]}{" "}
                                </div>
                              ))}
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
                      onClick={() => {
                        setShowModal(false);
                      }}
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
      </>
    );
}
