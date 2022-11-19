import { getLoggedIn, getUserData } from "../libs/auth";

import Image from "next/image";

import SGGaiGaiColoured from "../assets/SGGaiGai-White.svg";
import Link from "next/link";

import NavItem from "../components/NavItem";
import { useRouter } from "next/router";

export default function NavBar(props) {
  const router = useRouter();

  async function handleLogout(event) {
    event.preventDefault();

    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getUserData()),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!getLoggedIn()) {
          alert("You have logged out successfully!");
          router.push("/");
        }
      });
  }

  const userData = getUserData();

  const isAdmin = userData.isAdmin;

  return (
    <nav
      className={`${
        props.view == "trip"
          ? "bg-sgg-brown"
          : props.view == "eat"
          ? "bg-sgg-orange"
          : props.view == "do"
          ? "bg-sgg-yellow"
          : props.view == "stay"
          ? "bg-sgg-green"
          : "bg-sgg-black"
      } transition-colors duration-300`}
    >
      <div className="container flex items-center justify-between px-5 py-3 text-white">
        <Link href="/app">
          <Image src={SGGaiGaiColoured} alt="SGGaiGai's Logo" />
        </Link>
        <ul className="hidden gap-10 md:flex">
          <NavItem href="/app/favourites">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favourites
          </NavItem>
          <NavItem href="/app/trips">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Trips
          </NavItem>
          <NavItem href="/app/account">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Account
          </NavItem>
          {isAdmin == 1 ? (
            <NavItem href="/app/admin">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </NavItem>
          ) : null}
          <button onClick={handleLogout}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </ul>
      </div>
    </nav>
  );
}
