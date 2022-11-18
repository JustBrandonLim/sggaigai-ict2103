import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-White.svg";
import Link from "next/link";

import NavItem from "../components/NavItem";

export default function NavBar(props) {
  return (
    <nav
      className={`${
        props.view == "trip" ? "bg-[#A77E5A]" : props.view == "eat" ? "bg-sgg-orange" : props.view == "do" ? "bg-sgg-yellow" : "bg-sgg-green"
      } transition-colors hover:duration-300`}
    >
      <div className="container flex items-center justify-between px-5 py-3 text-white md:px-0">
        <Link href="/app">
          <a>
            <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
          </a>
        </Link>
        <ul className="hidden gap-10 md:flex">
          <NavItem href="/favourites">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favourites
          </NavItem>
          <NavItem href="/trip">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Trips
          </NavItem>
          <NavItem href="/profile">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Profile
          </NavItem>
        </ul>
      </div>
    </nav>
  );
}
