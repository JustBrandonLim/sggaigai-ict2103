import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../../libs/auth";
import Layout from "../../../layouts/Layout";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  const [userData, setUserData] = useState(false);
  const [state, setState] = useState(false);
  const [changed, setChanged] = useState("");
  const [priceLevelVisible, setPriceLevelVisible] = useState(true);

  const [user, setUsers] = useState("");
  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);

  useEffect(() => {
    if (userData.isAdmin == 0) router.push("/app");
    fetch(`../../api/admin/getUser`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message.length != 0) {
          setUsers(result.message); //sets the new result
        } else {
          setUsers([]);
        }
      });
  }, [state]);

  //
  useEffect(() => {
    const place_type = changed;
    if (place_type == "Hotel") {
      document.querySelector("#stars").style.display = "block";
      document.querySelector("#price_level").style.display = "none";
      document.querySelector("#price_level").value = "";
      document.querySelector("#openingHours").style.display = "none";
      document.querySelector("#openingHours").value = "";
      setPriceLevelVisible(true);
    } else {
      document.querySelector("#stars").style.display = "none";
      document.querySelector("#stars").value = "";
      document.querySelector("#price_level").style.display = "block";
      document.querySelector("#openingHours").style.display = "block";
      setPriceLevelVisible(false);
    }
  }, [changed]);

  function handleChecks(event) {
    let errMsg = "";
    const latitude = parseFloat(event.target.querySelector("#Latitude").value);
    const longitude = parseFloat(event.target.querySelector("#Longitude").value);
    const price_level = parseFloat(event.target.querySelector("#price_level").value);
    const stars = parseFloat(event.target.querySelector("#stars").value);

    console.log(latitude);
    if (-90 > latitude || latitude > 90) {
      errMsg += "Latitude must be within -90 and 90 \n";
    }
    if (-180 > longitude || longitude > 180) {
      errMsg += "Latitude must be within -180 and 180 \n";
    }
    if ((!priceLevelVisible && 0 > stars) || stars > 5) {
      errMsg += "Stars must be between 0 - 5 \n";
    }
    if ((priceLevelVisible && 0 > price_level) || price_level > 5) {
      errMsg += "Price Level must be between 0 - 5 \n";
    }
    return errMsg;
  }

  function convertToJson(
    place_type,
    ID,
    place_name,
    vicinity,
    address,
    phoneNumber,
    latitude,
    longitude,
    imageRef,
    openingHours,
    types,
    starOrPriceLvl
  ) {
    var jsonString = {};

    //concat place type and ID
    let place_id = "";
    if (place_type == "Restaurant") {
      place_id = "R" + ID;
    } else if (place_type == "Hotel") {
      place_id = "H" + ID;
    } else {
      place_id = "E" + ID;
    }

    if (place_type == "Hotel") {
      jsonString = {
        ID: place_id,
        name: place_name,
        vicinity: vicinity,
        address: address,
        phone_number: phoneNumber,
        loc: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
        ratings: 0,
        user_ratings: 0,
        imageRef: imageRef,
        openingHours: "",
        types: types,
        stars: parseFloat(starOrPriceLvl),
        reviews: [],
      };
    } else {
      jsonString = {
        ID: place_id,
        name: place_name,
        vicinity: vicinity,
        address: address,
        phone_number: phoneNumber,
        loc: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
        ratings: 0,
        user_ratings: 0,
        imageRef: imageRef,
        openingHours: openingHours,
        types: types,
        price_level: parseFloat(starOrPriceLvl),
        reviews: [],
      };
    }
    return jsonString;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const place_type = event.target.querySelector("#place_type").value;
    const ID = event.target.querySelector("#ID").value;
    const place_name = event.target.querySelector("#name").value;
    const vicinity = event.target.querySelector("#vicinity").value;
    const address = event.target.querySelector("#address").value;
    const phoneNumber = event.target.querySelector("#phone_number").value;
    const latitude = event.target.querySelector("#Latitude").value;
    const longitude = event.target.querySelector("#Longitude").value;
    const imageRef = event.target.querySelector("#imageRef").value;
    const openingHours = event.target.querySelector("#openingHours").value;
    const types = event.target.querySelector("#types").value;
    const price_level = parseFloat(event.target.querySelector("#price_level").value);
    const stars = parseFloat(event.target.querySelector("#stars").value);

    var err = handleChecks(event);
    if (err) {
      alert(err);
    }
    if (place_type == "Hotel") {
      var jsonString = convertToJson(
        place_type,
        ID,
        place_name,
        vicinity,
        address,
        phoneNumber,
        latitude,
        longitude,
        imageRef,
        openingHours,
        types,
        stars
      );
    } else {
      var jsonString = convertToJson(
        place_type,
        ID,
        place_name,
        vicinity,
        address,
        phoneNumber,
        latitude,
        longitude,
        imageRef,
        openingHours,
        types,
        price_level
      );
    }

    await fetch("../../api/admin/addThings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        place_type: changed,
        data: jsonString,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Added!");
          window.location.reload();
        } else {
          alert(result.message);
        }
      });
  }

  return (
    <Layout view="default">
      <section className="container p-5">
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h1 className="flex items-center text-2xl font-bold">Add a place!</h1>
          </div>
        </div>
        <div class="container grid grid-cols-1 gap-5 px-10 py-5 content-center">
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg  ">
            <form className="flex flex-col w-2/3 max-w-sm gap-5 mx-auto mt-10" onSubmit={handleSubmit}>
              <div>
                <select name="place_type" id="place_type" onChange={(e) => setChanged(e.target.value)}>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Event">Event</option>
                </select>
                <input
                  id="ID"
                  type="text"
                  placeholder="Place ID"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                  pattern="[0-9]{4}"
                  required
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Place Name"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                  required
                />
                <input
                  id="vicinity"
                  type="text"
                  placeholder="Vicinity"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                  required
                />
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                  required
                />
                <input
                  id="phone_number"
                  type="tel"
                  placeholder="Phone Number"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                  pattern="[0-9]{8}"
                  required
                />
                <div className="flex flex-col items-center justify-between gap-0 md:flex-row md:gap-0">
                  <input
                    id="Latitude"
                    type="text"
                    placeholder="Latitude"
                    min="-90"
                    max="90"
                    className="w-1/2 p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                    required
                  />
                  <input
                    id="Longitude"
                    type="text"
                    placeholder="Longitude"
                    min="-180"
                    max="180"
                    className="w-1/2 p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                    required
                  />
                </div>
                <input
                  id="imageRef"
                  type="text"
                  placeholder="imageRef"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                />
                <input
                  id="openingHours"
                  type="text"
                  placeholder="opening hours"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                />
                <input id="types" type="text" placeholder="types" className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
                <input
                  id="price_level"
                  type="text"
                  placeholder="Price level out of 5"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                />
                <input
                  id="stars"
                  type="text"
                  placeholder="Stars out of 5"
                  className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                />
              </div>

              <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
                <button
                  onClick="history.back()"
                  className="px-10 py-2 text-white transition-colors duration-150 bg-black rounded-sm hover:bg-sgg-red/80"
                >
                  Back
                </button>
                <button type="submit" className="px-10 py-2 text-white transition-colors duration-150 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
