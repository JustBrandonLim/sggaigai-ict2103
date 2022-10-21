import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout(props) {
  return (
    <>
      <header>{props.loggedIn ? <NavBar view={props.view} /> : null}</header>
      <main>{props.children}</main>
      <footer>
        <Footer view={props.loggedIn ? props.view : null} />
      </footer>
    </>
  );
}
