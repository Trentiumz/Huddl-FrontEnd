import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Checkbox, Form, Input, message, Flex,Typography } from "antd";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";
import { login_api } from "../api.jsx"




const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    login_api(values)
    navigate("/account")
    setTimeout(function(){
       window.location.reload();
    }, 500);
  };
  
  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100%" }} 
      vertical="true"
    >
      <Title>Login</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{}}>
          <Flex justify="center" align="center">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Flex>
        </Form.Item>
      </Form>
      Don't have an account?
      <Button type="link" onClick={handleSignUpClick}>
        Sign Up
      </Button>
    </Flex>
  );
}
