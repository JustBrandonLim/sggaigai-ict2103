import Layout from "../layouts/Layout";
import Image from "next/image";
import SGGaiGaiColoured from "../assets/SGGaiGai-Coloured.svg";
import Link from "next/link";



export default function Register() {
  return (
    <Layout loggedIn={false}>
    <section className="container p-5">
      <div className="flex flex-col text-center gap-3 justify-center">
        <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
        <p className="text-gray-500 text-sm md:text-base">Your very own travel companion</p>
      </div>
      <form className="mx-auto mt-10 flex flex-col gap-5 w-2/3 max-w-sm">
        <p className="font-bold">Register</p>
        <input type="text" placeholder="Email" className="focus:outline-sgg-blue p-2" />
        <input type="password" placeholder="Password" className="focus:outline-sgg-blue p-2" />
        <input type="password" placeholder="Confirm password" className="focus:outline-sgg-blue p-2" />
        <div className="flex flex-col md:flex-row gap-0 md:gap-0 justify-between items-center">
        <input type="text" placeholder="First Name" className="w-1/2 focus:outline-sgg-blue p-2" />
        <input type="text" placeholder="Last Name" className="w-2/5 focus:outline-sgg-blue p-2" />
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
          <button type="submit" className="bg-sgg-blue text-white px-10 py-2 hover:bg-sgg-blue/80">
            Register
          </button>
          <p>
          Already a member?{" "}
          <Link href="/">
            <a className="text-sgg-blue hover:text-sgg-blue/80 checked:bg-red-500">Log in</a>
          </Link>{" "}
          now!
        </p>
        </div>
      </form>
    </section>
  </Layout>
  )
}
