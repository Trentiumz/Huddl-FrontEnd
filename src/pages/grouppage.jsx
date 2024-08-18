import * as React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Flex,
  Button,
  Card,
  Typography,
  Col,
  Row,
  Drawer,
  Space,
  Form,
  Input,
  Select,
} from "antd";
import { getuser_api, make_group_api } from "../api.jsx";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const generateCardData = (title, desc, id) => {
  return {
    title: title,
    content: desc,
    groupId: id,
  };
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function GroupPage() {
  const navigate = useNavigate();
  const gotoGroup = (id) => {
    navigate("/group?id=" + id);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onConfirm = (values) => {
    make_group_api(values.name, true, values.description);
    setOpen(false);
    setTimeout(function(){
       window.location.reload();
    }, 500);
  };


  
  const [groupData, setGroupData] = useState(null);
  let cardData = [];
  useEffect(() => {
    async function getData() {
      const token = await getuser_api();
      setGroupData(token);
    }
    getData();
  }, []);
  try {
    groupData.groups_in.forEach((group) => {
      cardData.push(generateCardData(group.name, group.description, group.id));
    });
  } catch (e) {}

  return (
    <>
      <Drawer
        title="Create a new group"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onConfirm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your group's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your group's description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Flex justify="center" align="center">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Drawer>
      <Flex vertical="true" gap="large" justify="flex-start">
        <Title>Your Groups</Title>
        <Row gutter={[0, 16]}>
          {cardData.length > 0 &&
            cardData.map((card) => (
              <Card
                title={card.title}
                style={{ width: 400, height: 200, marginRight: 16 }}
                hoverable="true"
                onClick={() => gotoGroup(card.groupId)}
                key={card.groupId}
              >
                {card.content}
              </Card>
            ))}
          <Card
            style={{ width: 400, height: 200, marginRight: 16, padding: 0 }}
            hoverable="true"
            onClick={() => showDrawer()}
            key={-1}
          >
            <Flex align="center" justify="center" style={{ height: "400" }}>
              <Title> </Title>
              <Title>+</Title>
            </Flex>
          </Card>
        </Row>
      </Flex>
    </>
  );
}
