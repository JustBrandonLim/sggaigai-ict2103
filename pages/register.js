import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../layouts/Layout";
import { getLoggedIn } from "../libs/auth";
import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-Coloured.svg";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (getLoggedIn()) router.push("/app");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.querySelector("#email").value;
    const password = event.target.querySelector("#password").value;
    const confirmPassword = event.target.querySelector("#confirmPassword").value;
    const firstName = event.target.querySelector("#firstName").value;
    const lastName = event.target.querySelector("#lastName").value;

    if (password != confirmPassword) alert("Please ensure your passwords match!");
    else
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, isAdmin: 0 }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result["results"] == true) {
            router.push("/");
          } else {
            alert("Something went wrong!");
          }
        });
  }

  return (
    <Layout>
      <section className="container p-5">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
          <p className="text-sm text-gray-500 md:text-base">Your very own travel companion</p>
        </div>
        <form className="flex flex-col w-2/3 max-w-sm gap-5 mx-auto mt-10" onSubmit={handleSubmit}>
          <p className="font-bold">Register</p>
          <input id="email" type="email" placeholder="Email" className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
          <input id="password" type="password" placeholder="Password" className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
          />
          <div className="flex flex-col items-center justify-between gap-0 md:flex-row md:gap-0">
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              className="w-1/2 p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
            />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-2/5 p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
            <button type="submit" className="px-10 py-2 text-white transition-colors duration-150 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80">
              Register
            </button>
            <p>
              Already a member?{" "}
              <Link href="/" className="transition-colors duration-150 text-sgg-blue hover:text-sgg-blue/80">
                Log in
              </Link>{" "}
              now!
            </p>
          </div>
        </form>
      </section>
    </Layout>
  );
}
