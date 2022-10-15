import { Button } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data.message[0].name);
      });
  }, []);

  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <p>Name: {data.message[0].name}</p>
      <Button type="primary">HELLO WORLD</Button>
    </div>
  );
}
