import React, { useState, useEffect } from "react";
import { Flex, Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { user_status_in_group_api, group_info_api, view_plans_api } from "../api.jsx";

const { Title, Text } = Typography;

export default function Group() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const navigate = useNavigate();

  const [perms, setPerms] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [hangoutData, setHangoutData] = useState([]);
  
  // Fetch user permissions
  useEffect(() => {
    async function getPerms() {
      const token = await user_status_in_group_api(id);
      setPerms(token);
    }
    getPerms();
  }, [id]);

  // Fetch group data
  useEffect(() => {
    async function getGroupData() {
      const token = await group_info_api(Number(id), true);
      setGroupData(token);
    }
    getGroupData();
  }, [id]);

  // Fetch hangout plans
  useEffect(() => {
    async function getHangoutData() {
      const hangouts = await view_plans_api(Number(id));
      console.log("Hangout Data from API:", hangouts); // Debugging: Log API response

      if (Array.isArray(hangouts)) {
        setHangoutData(hangouts);
      } else {
        console.error("Expected an array but got:", hangouts);
      }
    }
    getHangoutData();
  }, [id]);

  if (!groupData || perms === null) {
    return <Text>Loading...</Text>;
  }

  if (perms === false) {
    return (
      <Flex align="center" justify="center">
        <Title>Sorry! You don't have permissions to view this group!</Title>
      </Flex>
    );
  }
  return (
    <Flex vertical="true" style={{ marginBottom: "20px" }}>
      <Title>{groupData[0]?.name}</Title>
      <Flex style={{ height: "100%" }}>
        <Flex vertical="true" style={{ width:"100%", height: "100%" }}>
          <Button
            type="primary"
            size="large"
            style={{ width: "100%", height: "30%", fontSize: "200%" }}
            onClick={() => { navigate("/makeplan?id=" + id) }}
          >
            Plan New Hangout
          </Button>

          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              height: "30%",
              fontSize: "200%",
              marginTop: "20px",
            }}
            onClick={() => { navigate("/addactivity?id=" + id) }}
          >
            Add Hangout Activity
          </Button>

          <Flex style={{ marginTop: "20px", height: "30%" }}>
            <Button
              type="primary"
              size="large"
              style={{ width: "100%", height: "100%", fontSize: "200%" }}
            >
              Hangout History
            </Button>

            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                height: "100%",
                fontSize: "200%",
                marginLeft: "20px",
              }}
            >
              Options
            </Button>
          </Flex>
        </Flex>
        <Flex
          vertical="true"
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            width: "100%",
            height: "94%",
          }}
        >
          <Card title="Upcoming Hangouts" style={{height: "50%", overflow: "auto" }}>
            <Flex vertical="true">
              {hangoutData.length > 0 ? (
                hangoutData.map((hangout, index) => {
                  console.log(hangout)
                  return (
                    <div key={index} style={{
                      marginBottom: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      borderRadius: "15px",
                      borderStyle: "solid",
                      borderColor: "black",
                      borderWidth: "1px"
                    }}>
                      <Text style={{ 
                        fontSize: "1rem"
                      }} >
                        {`Name: ${hangout.activity.name}, Location: ${hangout.activity.location}, Time: ${hangout.start_time}\n\n`}
                      </Text>
                      
                    </div>
                  );
                })
              ) : (
                <Text>No upcoming hangouts</Text>
              )}
            </Flex>
          </Card>
          <Card title="Members" style={{ height: "50%", marginTop: "20px", overflow: "auto" }}>
            <Flex vertical="true">
              {groupData[0]?.members.map((member, index) => (
                <Text key={index} style={{ fontSize: "1.5rem" }}>{member.username}</Text>
              ))}
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
