const { connectToDatabase } = require("../../../libs/mongodb");

import Layout from "../../../layouts/Layout";

import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getLoggedIn, getUserData } from "../../../libs/auth";
import { getCookie } from 'cookies-next';
const url = require('url');
// import {useRouter} from 'next/router';


export default function Item(props) {
  const router = useRouter();

  const [userData, setUserData] = useState({});
  const [reviewData, setReviewData] = useState(null);
  const [review, setReview] = useState();

  const reviewChangeHandler = (event) => {
    // console.log(event.target.value);
    setReview(event.target.value);

  }

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(JSON.parse(getCookie('userData')));
  }, []);


  useEffect(() => {
    setReviewData(null);

    const pathname = window.location.pathname;
    const activity_id = pathname.split("/")[3];


    fetch(`/api/search/reviews/${activity_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((reviewData) => {
        setReviewData(reviewData);
        // console.log(reviewData);

      });

  }, [userData]);

  async function handleReviewClick(event, id) {
    event.preventDefault();

    const pathname = window.location.pathname;
    const activity_id = pathname.split("/")[3]

    await fetch("/api/search/review/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: userData.email, review: review, activity_id: activity_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["results"]) {
          alert("Review has been added!");
          router.reload(window.location.pathname);
        } else alert("Something went wrong!");
      });
  }

  async function handleReviewDelClick(id) {
    // console.log("this review id is:" + id);

    const pathname = window.location.pathname;
    const activity_id = pathname.split("/")[3]
    console.log(activity_id);
    const response = await fetch("/api/search/review/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review_id: id, activity_id: activity_id })
    })

      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result["results"]) {
          alert("Review has been deleted!");
          router.reload(window.location.pathname);
        } else alert("Something went wrong!!!!!!!");
      });
  }

  const view = props.category;
  const data = JSON.parse(props.data);

  const name = data.name;
  const address = data.address;
  const price = data["price_level"];
  const contact = data["phone_number"];
  const rating = data.rating;
  const openingHours = data["opening_hours"];
  const stars = data.stars;


  const image = data.imageRef;

  const renderReviews = () => {
    if (reviewData != null) {
      if (reviewData.reviews != undefined) {
        return (
          reviewData.reviews.map((data, i) =>
          <>
            {i == 0 && <div className="font-bold text-xl">Reviews</div>}
            <div className="flex items-center justify-between shadow-sm mb-2">
              <div className="flex flex-col">
                <div>{data["email"]}</div>
                <div>{data["review_desc"]}</div>
              </div>
              <div className="flex items-center gap-2">
                {/* <div className="" onClick={() => handleReviewEditClick(data.review_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                </div> */}
                <div className="" onClick={() => handleReviewDelClick(data.review_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
            </div>
            </>
          )
        )
      }
    }
  }

  return (
    <Layout loggedIn={true} view={view} admin={false}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl font-bold">{name}</h2>
            <p className="mt-5 text-sgg-gray text-md">{address}</p>
          </div>
        </div>
        <div className="container relative flex flex-col items-start min-h-full gap-5 px-5 py-5 lg:flex-row">
          <Image src={image} alt={name + " Image"} className="object-cover h-96 w-96" width={0} height={0} sizes="100vw" />
          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            {view == "eat" || view == "do" ? (
              <div>
                <h4 className="font-semibold">Opening Hours</h4>
                <div className="mt-3">
                  {openingHours.map((data, i) => (
                    <p key={i}>{data}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-bold">Stars</h4>
                <p className="mt-3">{stars} star hotel</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold">Rating</h4>
              <p className="flex items-center gap-3 mt-3">
                {rating} / 5
                <span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </span>
              </p>
            </div>
            {view == "eat" || view == "do" ? (
              <div>
                <h4 className="font-semibold">Price</h4>
                <div className="flex items-center mt-3">
                  {[...Array(5).keys()].map((e, i) =>
                    price <= e ? (
                      <svg key={i} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  )}
                </div>
              </div>
            ) : null}
            <div>
              <h4 className="font-semibold">Contact</h4>
              <p className="mt-3">{contact ? contact : "Not Available"}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-10">
            <h4 className="flex items-center text-xl">Review</h4>
            <div className="grid lg:grid-cols-2">
              <div className="mt-5 text-sgg-gray text-m">{name}</div>
                <div className="mt-5 ml-3 text-sgg-gray ">{name}</div>
                  <p className="text-md">{review}</p>
                </div>
            </div>
          </div> */}
        <div>
          <div className=" container flex flex-col justify-start min-h-full gap-5 px-5 py-5">
            {/* {reviewData != null
              ? {reviewData.reviews != undefined ? 
              : [...Array(5)].map((data, i)) }
               */}
            {renderReviews()}
            <div className="flex flex-col items-start gap-4 justify-start">
              <input
                id="addReview"
                type="text"
                placeholder="Add Review"
                className=" container flex flex-col items-center justify-start pl-2 py-3 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
                rows="3"
                onChange={reviewChangeHandler}
              />
              <button type="submit" onClick={handleReviewClick} className="w-30 p-2 px-5 text-white transition-colors rounded-sm bg-sgg-blue hover:bg-sgg-blue/20">
                Add Review
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


export async function getStaticPaths() {
  let { db } = await connectToDatabase();

  let restaurants = await db.collection("RESTAURANTS").find().project({ _id: 0, ID: 1 }).toArray();

  let paths = restaurants.map((restaurant) => {
    return { params: { category: "eat", id: restaurant.ID } };
  });

  let events = await db.collection("EVENTS").find().project({ _id: 0, ID: 1 }).toArray();

  paths.push(
    ...events.map((event) => {
      return { params: { category: "do", id: event.ID } };
    })
  );

  let hotels = await db.collection("HOTELS").find().project({ _id: 0, ID: 1 }).toArray();

  paths.push(
    ...hotels.map((hotel) => {
      return { params: { category: "stay", id: hotel.ID } };
    })
  );

  // let review = await db.collection("REVIEWS").find().project({ _id: 0, ID: 1 }).toArray();

  // paths.push(
  //   ...reviews.map((review) => {
  //     return { params: { id: review.ID } };
  //   })
  // );

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const category = context.params.category;
  const id = context.params.id;

  let data = null;

  let { db } = await connectToDatabase();
  switch (category) {
    default:
      return { notFound: true };
    case "eat":
      let restaurants = await db.collection("RESTAURANTS").find({ ID: id }).toArray();
      data = JSON.stringify(restaurants[0]);
      break;
    case "do":
      let events = await db.collection("EVENTS").find({ ID: id }).toArray();
      data = JSON.stringify(events[0]);
      break;
    case "stay":
      let hotels = await db.collection("HOTELS").find({ ID: id }).toArray();
      data = JSON.stringify(hotels[0]);
      break;
  }

  return { props: { data, category }, revalidate: 30 };
}

/*
export async function getServerSideProps(context) {
  const category = context.query.category;
  const id = context.query.id;

  let data = null;

  let { db } = await connectToDatabase();
  switch (category) {
    default:
      return { notFound: true };
    case "eat":
      let restaurants = await db.collection("RESTAURANTS").find({ ID: id }).toArray();
      data = JSON.stringify(restaurants[0]);
      break;
    case "do":
      return { notFound: true };
    case "stay":
      let hotels = await db.collection("HOTELS").find({ ID: id }).toArray();
      data = JSON.stringify(hotels[0]);
      break;
  }

  return { props: { data, category } };
}
*/
