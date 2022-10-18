export default function NavBar(props) {
  if (!props.loggedIn)
    return (
      <div>
        <p>not logged in</p>
      </div>
    );
  else
    return (
      <div>
        <p>logged in!</p>
      </div>
    );
}
