import { useEffect, useState } from "react";
import { getLoggedIn, getUserData } from "../../libs/auth";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (!getLoggedIn()) router.push("/");
    else setUserData(getUserData());
  }, []);
  return <Layout view="default"></Layout>;
}
