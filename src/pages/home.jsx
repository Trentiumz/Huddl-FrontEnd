import * as React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Flex, Button, Typography  } from "antd";
import { getuser_api } from "../api.jsx";
const {Title, Text} = Typography;


export default function Home() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      const token = await getuser_api();
        setUserData(token);
    }
    getData();
  }, []);
  try {
    console.log(userData)
    console.log(userData?.username)

  } catch (e) {}

  return (
    <>
    <Flex id="wrapper" align="center" justify="center" vertical="true" gap="small" style={{height:"30%"}}>
      <Title>Welcome to huddl.</Title>
      <text>huddl. is a platform for planning events.</text>
      <text>Get started by creating an account, then joining or creating a group.</text>
    </Flex>
      
    </>
  );
}

