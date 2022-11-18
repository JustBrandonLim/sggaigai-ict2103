const { connectToDatabase } = require("../../../libs/mongodb");

import Layout from "../../../layouts/Layout";

import Image from "next/image";

export default function ItemPage(props) {
  const view = props.category;
  const data = JSON.parse(props.data);

  console.log(data);

  const name = data.name;
  const address = data.address;
  const price = data["price_level"];
  const contact = data["phone_number"];
  const rating = data.rating.toFixed(1);
  const openingHours = data["opening_hours"];
  const stars = data.stars;

  const image = data.imageRef;

  return (
    <Layout loggedIn={true} view={view}>
      <section>
        <div className="bg-white">
          <div className="container flex flex-col items-start justify-center px-5 py-20">
            <h2 className="flex items-center text-2xl">{name}</h2>
            <p className="mt-5 text-sgg-gray text-md">{address}</p>
          </div>
        </div>
        <div className="container flex flex-col items-start justify-between min-h-full gap-5 px-5 py-5 lg:flex-row">
          <div className="grid grid-cols-1 gap-5 lg:gap-10 lg:grid-cols-2">
            {view == "eat" ? (
              <div>
                <h4 className="font-bold">Opening Hours</h4>
                <div className="mt-3">
                  {openingHours.map((data, i) => (
                    <p key={i}>{data}</p>
                  ))}
                </div>
              </div>
            ) : view == "do" ? null : (
              <div>
                <h4 className="font-bold">Stars</h4>
                <p className="mt-3">{stars}</p>
              </div>
            )}
            <div className="flex flex-col gap-5">
              {view == "eat" ? (
                <div>
                  <h4 className="font-bold">Price Level</h4>
                  <p className="mt-3">{price}</p>
                </div>
              ) : view == "do" ? null : null}
              <div>
                <h4 className="font-bold">Contact</h4>
                <p className="mt-3">{contact ? contact : "Not Available"}</p>
              </div>
              <div>
                <h4 className="font-bold">Ratings</h4>
                <p className="mt-3">{rating}</p>
              </div>
            </div>
          </div>
          <Image src={image} alt={name + " Image"} width={500} height={500} />
        </div>
      </section>
    </Layout>
  );
}

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
