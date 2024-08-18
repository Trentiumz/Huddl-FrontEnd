import * as React from "react";
import ReactDOM from "react-dom/client";
import { Button, Flex, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./landing.css";
const {Title,Text} = Typography;

export default function Landing() {
  const navigate = useNavigate();
  return (
    <Flex vertical="true" style={{ height: "100vh" }} justify="flex-start">
      <Flex
        className="bga"
        align="center"
        justify="center"
        vertical="true"
        style={{ userSelect: "none", width: "100%", height: "100%" }}
      >
        <Flex align="center"
          justify="center" vertical="true">
          <Title style={{color:"#eceff4"}}>huddl. </Title>
          <Text style={{color:"#eceff4"}}>A platform for getting together.</Text>
          <div style={{height:"20px"}}></div>
          <Button
            type="primary"
            onClick={() => {
              navigate("/home");
            }}
          >
            home
          </Button>
          
          
        </Flex>
      </Flex>
      <Flex
        direction="column"
        style={{ height: "auto", padding: "10px" }}
        justify="center"
        align="flex-end"
      >
        <Typography style={{color:"#d8dee9"}}>By Lexi Han, James Huynh, Daniel Ye, Ethan Zhu</Typography>
      </Flex>
    </Flex>
  );
}
