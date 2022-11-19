import { useState, useEffect } from "react";
import { getLoggedIn } from "../libs/auth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getLoggedIn());
  }, []);

  return (
    <>
      <header>{isLoggedIn ? <NavBar view={props.view} /> : null}</header>
      <main>{props.children}</main>
      <footer>
        <Footer view={isLoggedIn ? props.view : null} />
      </footer>
    </>
  );
}
