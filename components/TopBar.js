import { Tabs } from "antd";

const items = [
  {
    label: "Nearby",
    key: "nearby",
  },
  {
    label: "Restaurants",
    key: "restaurants",
  },
  {
    label: "Hotels",
    key: "hotels",
  },
];

export default function TopBar() {
  return <Tabs defaultActiveKey="1" items={items} />;
}
