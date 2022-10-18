import Layout from "../layouts/Layout";

import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-Coloured.svg";
import Link from "next/link";

export default function Home() {
  /*const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data.message[0].name);
      });
  }, []);

  if (!data) return <p>No profile data</p>;*/

  return (
    <Layout loggedIn={false}>
      <section className="container p-5">
        <div className="flex flex-col text-center gap-3 justify-center">
          <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
          <p className="text-gray-500 text-sm md:text-base">Your very own travel companion</p>
        </div>
        <form className="mx-auto mt-10 flex flex-col gap-5 w-2/3 max-w-sm">
          <p className="font-bold">Login</p>
          <input type="text" placeholder="Username" className="focus:outline-sgg-blue p-2" />
          <input type="password" placeholder="Password" className="focus:outline-sgg-blue p-2" />
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
            <button type="submit" className="bg-sgg-blue text-white px-5 py-2 hover:bg-sgg-blue/80">
              Sign In
            </button>
            <label>
              <input type="checkbox" className="mr-1 accent-sgg-blue hover:accent-sgg-blue" />
              Remember Me
            </label>
          </div>
          <p>
            Not a member?{" "}
            <Link href="/register">
              <a className="text-sgg-blue hover:text-sgg-blue/80 checked:bg-red-500">Sign up</a>
            </Link>{" "}
            now!
          </p>
        </form>
      </section>
      {/*<p>Name: {data.message[0].name}</p>*/}
    </Layout>
  );
}
