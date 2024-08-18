import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Checkbox, Form, Input, message, Flex,Typography } from "antd";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";
import { add_activity_api } from "../api.jsx"

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function AddActivity() {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  console.log("ID is " + id)
  const onFinish = async (values) => {
    //(id, name, cost, time, location, description, link) => {
    let good = await add_activity_api(Number(id),values.name,Number(values.cost),`PT${values.time}M`,values.location,values.description,values.link)
    if (good){
               navigate("/group?id=" + id)
               setTimeout(function(){
                  window.location.reload();
               }, 600);
      message.success("Succesfully added activity!");
      }

  };
  return (
  <Flex align="center" justify="center">
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Activity Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Estimated Cost (A Number)"
        name="cost"
        rules={[{ required: true, message: "Please enter the cost!" }]}
      >      
        <Input />
      </Form.Item>

      <Form.Item
        label="Estimated Duration (In minutes)"
        name="time"
        rules={[{ required: true, message: "Please enter the duration!" }]}
      >      
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="location"
      >      
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >      
        <Input />
      </Form.Item>

      <Form.Item
        label="Link"
        name="link"
      >      
        <Input />
      </Form.Item>
      
    <Form.Item wrapperCol={{}}>
        <Flex justify="center" align="center">
          <Button type="primary" htmlType="submit">
            Add Hangout
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  </Flex>
    
  );
}