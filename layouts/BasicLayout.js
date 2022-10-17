import { Layout } from "antd";

import NavBar from "../components/TopBar";

const { Header, Footer, Content } = Layout;

export default function BasicLayout(props) {
  return (
    <>
      <Layout>
        <Header></Header>
        <Content>
          <NavBar />
          {props.children}
        </Content>
        <Footer>FOOTER</Footer>
      </Layout>
    </>
  );
}
