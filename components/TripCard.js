import { useState } from "react";
let strokeColor = "orange";
let activeColor = "grey";

export default function TripCard(props) {
    const [activeNode, setActiveNode] = useState(0);

    if (activeNode == props.id)
    {
        switch(props.tripData[0].action) {
            case 'eat':
                activeColor = "#CC715A";
                break;
            case 'do':
                activeColor = "#C99F38";
                break;
            case 'stay':
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

    switch(props.tripData[0].action) {
        case 'eat':
            strokeColor = "#CC715A";
          break;
        case 'do':
            strokeColor = "#C99F38";
          break;
        case 'stay':
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
      <li className="grid grid-flow-row py-2 trip-grid-wrapper" onClick={() => setActiveNode(props.id)}>
        <div className="relative flex-row text-right whitespace-nowrap">
            <p className="font-bold font-xl">{props.tripData[0].stopName}</p>
            <p className="font-md">{props.tripData[0].time}</p>
        </div>
            <div className="items-center justify-center align-middle">
                <svg className={`${
                        props.id == activeNode ? "animate-pulse" : ""
                      } timeline-circle`} height="20" width="60">
                    <circle cx="50" cy="10" r="5" stroke=
                    {`${
                        props.view == "edit" ? activeColor : strokeColor
                      }`} strokeWidth="3" fill="white"/>
                </svg>  
                <div class="hidden sm:flex w-0.5 bg-gray-200 h-full m-auto"></div>
            </div>
        <div className="invisible text-left break-words md:visible">
            <p className="font-bold font-xl">{props.tripData[0].eventName}</p>
            <p className="font-md">{props.tripData[0].vicinity}</p>
        </div>
      </li>
      );
  }