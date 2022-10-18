import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout(props) {
  return (
    <>
      <header>{props.loggedIn ? <NavBar /> : null}</header>
      <main>{props.children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
