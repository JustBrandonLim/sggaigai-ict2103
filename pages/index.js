import { useEffect } from "react";
import { useRouter } from "next/router";
import { getLoggedIn } from "../libs/auth";
import Layout from "../layouts/Layout";

import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-Coloured.svg";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (getLoggedIn()) router.push("/app");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.querySelector("#email").value;
    const password = event.target.querySelector("#password").value;

    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (getLoggedIn()) {
          router.push("/app");
        } else {
          alert("Incorrect username or password!");
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
          <p className="font-bold">Login</p>
          <input id="email" type="email" placeholder="Email" className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
          <input id="password" type="password" placeholder="Password" className="p-2 rounded-sm ring-2 ring-sgg-input-gray focus:outline-sgg-blue" />
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
            <button type="submit" className="px-5 py-2 text-white transition-colors duration-150 rounded-sm bg-sgg-blue hover:bg-sgg-blue/80">
              Sign In
            </button>
            <label className="flex items-center">
              <input type="checkbox" className="mr-1 accent-sgg-blue hover:accent-sgg-blue" />
              Remember Me
            </label>
          </div>
          <p>
            Not a member?{" "}
            <Link href="/register" className="transition-colors duration-150 text-sgg-blue hover:text-sgg-blue/80">
              Sign up
            </Link>{" "}
            now!
          </p>
        </form>
      </section>
    </Layout>
  );
}
