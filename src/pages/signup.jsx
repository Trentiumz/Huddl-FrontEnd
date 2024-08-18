import * as React from "react";
import { Button, Tooltip, Form, Input, Flex, Typography,message } from "antd";
const { Title } = Typography;
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signup_api } from "../api";



const onFinishFailed = async (values) => {
  console.log(values);
};
export default function Signup() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    signup_api(values);
    navigate("/login");
    //window.location.reload();
  };
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the signup page
  };
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100%" }}
      vertical="true"
    >
      <Title>Register</Title>
      <Form
        name="register"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="How other users will find you!">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordRepeat"
          rules={[{ required: true, message: "Please repeat your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{}}>
          <Flex justify="center" align="center">
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Flex>
        </Form.Item>
      </Form>
      Have an account? 
      <Button type="link" onClick={handleLoginClick}>
        Login
      </Button>
    </Flex>
  );
}
