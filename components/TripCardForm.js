import { useState } from "react";
let strokeColor = "orange";
let activeColor = "grey";

export default function TripCardForm(props) {
    const [charCount, setCharCount] = useState(0);
    const [activeNode, setActiveNode] = useState(-1);

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

    if (activeNode == props.id)
    {
        switch(props.tripData["place_type"]) {
            case 'EAT':
                activeColor = "#CC715A";
                break;
            case 'DO':
                activeColor = "#C99F38";
                break;
            case 'STAY':
                activeColor = "#264653";
                break;
            default:
                activeColor = "#CC715A";
            }    
    }
    else
    {
        activeColor = "grey";
    };

    switch(props.tripData["place_type"]) {
        case 'EAT':
            strokeColor = "#CC715A";
          break;
        case 'DO':
            strokeColor = "#C99F38";
          break;
        case 'STAY':
            strokeColor = "#264653";
          break;
        default:
            strokeColor = "#CC715A"
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
        <li className="grid grid-cols-1 py-2 md:grid-flow-row trip-grid-wrapper" onClick={() => activeNode != -1 ? setActiveNode(-1) : setActiveNode(props.id)}>
          <div className="relative flex-row text-center md:text-right whitespace-nowrap">
              <p className="font-bold">{props.tripData["stop_name"]}</p>
              <p className="">{convertTo12Time(props.tripData["stop_time"])}</p>
          </div>
              <div className="flex flex-col items-center justify-center md:block">
                  <svg className={`${
                          props.id == activeNode ? "animate-pulse" : ""
                        } timeline-circle`} height="20" width="60">
                      <circle cx="50" cy="10" r="5" stroke=
                      {`${
                          props.view == "edit" ? activeColor : strokeColor
                        }`} strokeWidth="3" fill="white"/>
                  </svg>  
                  <div className="hidden md:flex w-0.5 bg-gray-200 h-full m-auto"></div>
              </div>
          <div className="text-center break-words md:text-left">
              <p className="font-bold">{props.tripData["place_name"]}</p>
              <p className="">{props.tripData["place_address"]}</p>
          </div>
        </li>
          {activeNode == props.id ? (
            <>
            <div className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
              <div className="relative w-full max-w-3xl mx-auto my-6">
                <div className="relative flex items-center justify-start px-20 py-10">
                  <form className="flex flex-col justify-center h-full min-w-full text-justify bg-white border-2 rounded-md shadow-lg bs-gray-150">
                    <div className="p-5 bg-gray-50">
                      <h3 className="font-medium">Editing {props.tripData["stop_name"]} at {props.tripData["place_name"]}</h3>
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
                        <textarea placeholder="Vicinity" maxlength="100" onChange={e => setCharCount(e.target.value.length)} className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue" required />
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
                      <p onClick={()=> setActiveNode(-1)} className="text-sgg-blue hover:text-sgg-blue/80 hover:cursor-pointer">
                        Back
                      </p>
                      <button type="submit" onClick={() => setStatus("edit")} className="px-10 py-2 text-white transition-colors duration-150 border-2 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80 border-sgg-blue">
                        Save Edits
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
              ) : null
        }
      </>
      );
  }