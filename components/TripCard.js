import { useState } from "react";
let strokeColor = "orange";
let activeColor = "grey";

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

export default function TripCard(props) {
    const [activeNode, setActiveNode] = useState(-1);
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
          <div class="hidden sm:flex w-0.5 bg-gray-200 h-full m-auto"></div>
      </div>

      );
    else
      return (
      <li className="grid grid-cols-1 py-2 md:grid-flow-row trip-grid-wrapper" onClick={() => setActiveNode(props.id)}>
        <div className="relative flex-row text-center md:text-right whitespace-nowrap">
            <p className="font-bold font-xl">{props.tripData["stop_name"]}</p>
            <p className="font-md">{convertTo12Time(props.tripData["stop_time"])}</p>
        </div>
            <div className="flex flex-col items-center justify-center md:block">
                <svg className={`${
                        props.id == activeNode ? "animate-pulse" : ""
                      } timeline-circle`} height="20" width="60">
                    <circle cx="50" cy="10" r="5" stroke=
                    {`${
                        props.view == "edit" ? activeColor : strokeColor
                      } `} strokeWidth="3" fill="white"/>
                </svg>  
                <div class="hidden md:flex w-0.5 bg-gray-200 h-full m-auto"></div>
            </div>
        <div className="text-center break-words md:text-left">
            <p className="font-bold font-xl">{props.tripData["place_name"]}</p>
            <p className="font-md">{props.tripData["place_address"]}</p>
        </div>
      </li>
      );
  }