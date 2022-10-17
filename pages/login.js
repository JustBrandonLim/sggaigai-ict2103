import { useState } from "react";

import Image from "next/image";

import SGGaiGai from "../assets/SGGaiGai.svg";

import { Row, Col, Typography, Tabs, Form, Input, Space, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
  const [rememberMe, setRememberMe] = useState(true);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      <Row>
        <Col>
          <Space direction="vertical" size="small">
            <Image src={SGGaiGai} />
            <p>Your very own travel companion</p>
          </Space>
          <Form>
            <Space direction="vertical">
              <Title level={5}>Login</Title>
              <Input size="large" placeholder="Username" prefix={<UserOutlined style={{ color: "#cacaca" }} />} />
              <Input.Password size="large" placeholder="Password" prefix={<LockOutlined style={{ color: "#cacaca" }} />} />

              <Row align="middle" justify="space-between">
                <Col>
                  <Button type="primary">Sign In</Button>
                </Col>
                <Col>
                  <Checkbox checked={rememberMe} onChange={toggleRememberMe}>
                    Remember me
                  </Checkbox>
                </Col>
              </Row>
              <a>Not a member? Sign up now!</a>
            </Space>
          </Form>
        </Col>
      </Row>
    </>
  );
}
