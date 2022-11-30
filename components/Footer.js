export default function Footer(props) {
  return (
    <section
      className={`${
        props.view
          ? props.view == "trip"
            ? "bg-sgg-brown"
            : props.view == "eat"
            ? "bg-sgg-orange"
            : props.view == "do"
            ? "bg-sgg-yellow"
            : props.view == "stay"
            ? "bg-sgg-green"
            : "bg-sgg-black"
          : "bg-sgg-background"
      } ${props.view ? "text-white" : "text-gray-500"} transition-colors hover:duration-300`}
    >
      <div className="container p-5 text-sm text-center md:text-base">
        <p>SG GaiGai</p>
        <p>Copyright &copy; 2022. Produced by ICT2103, P1, Team 3.</p>
      </div>
    </section>
  );
}
