import { useState } from "react";
let strokeColor = "orange";
let activeColor = "grey";

export default function TripCardForm(props) {
    const [charCount, setCharCount] = useState(0);
    const [activeNode, setActiveNode] = useState(-1);

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
      <>
        <li className="grid grid-cols-1 py-2 md:grid-flow-row trip-grid-wrapper" onClick={() => activeNode != -1 ? setActiveNode(-1) : setActiveNode(props.id)}>
          <div className="relative flex-row text-center md:text-right whitespace-nowrap">
              <p className="font-bold">{props.tripData[0].stopName}</p>
              <p className="">{props.tripData[0].time}</p>
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
                  <div class="hidden md:flex w-0.5 bg-gray-200 h-full m-auto"></div>
              </div>
          <div className="text-center break-words md:text-left">
              <p className="font-bold">{props.tripData[0].eventName}</p>
              <p className="">{props.tripData[0].vicinity}</p>
          </div>
        </li>
          {activeNode == props.id ? (
            <>
            <div className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
              <div className="relative w-full max-w-3xl mx-auto my-6">
                <div className="relative flex items-center justify-start px-20 py-10">
                  <form className="flex flex-col justify-center h-full min-w-full text-justify bg-white border-2 rounded-md shadow-lg bs-gray-150">
                    <div className="p-5 bg-gray-50">
                      <h3 className="font-medium">Editing {props.tripData[0].stopName} at {props.tripData[0].eventName}</h3>
                    </div>
                    <div className="flex-grow px-5 py-1">
                      <div className="py-4 input-group">
                        <h4 className="pb-1">Stop Name</h4>
                        <input type="text" placeholder="Stop Name" className="w-full p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                      </div>
                      {/* <div className="grid grid-flow-row grid-cols-2 py-1"> */}
                      <div className="py-4 input-group">
                        <div className="flex flex-row pb-1">
                          <h4 className="w-2/3">Event Name</h4>
                          <h4 className="w-1/3 pl-2">Time</h4>
                        </div>
                        {/* <div className="flex flex-col items-center justify-between gap-0 md:flex-row md:gap-0"> */}
                        <div className="flex flex-row gap-4 ">
                          <input type="text" placeholder="Event Name" className="w-2/3 p-2 border-2 rounded-md focus:outline-sgg-blue" required />
                          <div className="flex w-1/3 p-2 border-2 rounded-md input-group">
                          <input type="text" placeholder="Time" className="w-full focus:outline-sgg-blue" required />
                          <span>
                            <svg fill="rgb(209, 213, 219)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12c0-.808.083-1.596.234-2.359h2.076c-.188.759-.31 1.543-.31 2.359 0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.234 0-4.292.744-5.957 1.989l2.049 2.049-7.012 1.354 1.354-7.013 2.183 2.183c2.036-1.598 4.594-2.562 7.383-2.562 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z" /></svg>
                          </span>
                          </div>
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