import Layout from "../layouts/Layout";

import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-Coloured.svg";
import Link from "next/link";

export default function Register() {
  return (
    <Layout loggedIn={false}>
      <section className="container p-5">
        <div className="flex flex-col justify-center gap-3 text-center">
          <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
          <p className="text-sm text-gray-500 md:text-base">Your very own travel companion</p>
        </div>
        <form className="flex flex-col w-2/3 max-w-sm gap-5 mx-auto mt-10">
          <p className="font-bold">Register</p>
          <input type="text" placeholder="Email" className="p-2 focus:outline-sgg-blue" />
          <input type="password" placeholder="Password" className="p-2 focus:outline-sgg-blue" />
          <input type="password" placeholder="Confirm password" className="p-2 focus:outline-sgg-blue" />
          <div className="flex flex-col items-center justify-between gap-0 md:flex-row md:gap-0">
            <input type="text" placeholder="First Name" className="w-1/2 p-2 focus:outline-sgg-blue" />
            <input type="text" placeholder="Last Name" className="w-2/5 p-2 focus:outline-sgg-blue" />
          </div>
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
            <button type="submit" className="px-10 py-2 text-white transition-colors duration-150 bg-sgg-blue hover:bg-sgg-blue/80">
              Register
            </button>
            <p>
              Already a member?{" "}
              <Link href="/">
                <a className="transition-colors duration-150 text-sgg-blue hover:text-sgg-blue/80">Log in</a>
              </Link>{" "}
              now!
            </p>
          </div>
        </form>
      </section>
    </Layout>
  );
}
