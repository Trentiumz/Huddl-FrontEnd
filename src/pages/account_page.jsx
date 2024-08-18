import * as React from "react";
import { useState, useEffect } from "react";
import { Flex, Button, Card, Typography } from "antd";
import { getuser_api } from "../api.jsx";
const { Title, Text } = Typography;

export default function AccountPage() {
  /*
  

  */
  //const user = getuser_api();
  //console.log(user);
  //console.log(user.username)
  //Returns: {username, email, full_name, is_staff, groups_owned, groups_managed, groups_in}
  /*
  const user= {
    username: 'estanzoo',
    email: 'estanzoo@zoo.com',
    groups_owned: ['1', '2'],
    groups_managed: ['1', '2', '3'],
    groups_in: ['1', '2', '3', '4'],
    full_name: 'Estan Zoo'
  }*/
  const [user, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      const token = await getuser_api();
      setUserData(token);
    }
    getData();
  }, []);
  try {
    var groupsOwned = [];
    var groupsIn = [];
    var groupsManaged = [];
    user.groups_owned.forEach((element) => groupsOwned.push(element.name));
    user.groups_in.forEach((element) => groupsIn.push(element.name));
    user.groups_managed.forEach((element) => groupsManaged.push(element.name));

    return (
      <Flex vertical="true">
        <Title>Your Account</Title>
        <Flex wrap>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "22px",
                }}
              >
                Username
              </div>
            }
            style={{
              width: 300,
              height: 130,
              borderRadius: "10px",
              margin: "20px",
            }} // Ensure the card has a border radius
            bodyStyle={{ padding: 0, margin: 0, borderRadius: "10px" }} // Remove padding from the body
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "72px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "#ECEFF4", // Set the background color here
              }}
            >
              <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {user.username}
              </p>
            </div>
          </Card>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "22px",
                }}
              >
                Full Name
              </div>
            }
            style={{
              width: 300,
              height: 130,
              borderRadius: "10px",
              margin: "20px",
            }} // Ensure the card has a border radius
            bodyStyle={{ padding: 0, margin: 0, borderRadius: "10px" }} // Remove padding from the body
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "72px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "#ECEFF4", // Set the background color here
              }}
            >
              <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {user.full_name}
              </p>
            </div>
          </Card>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "22px",
                }}
              >
                Groups Owned
              </div>
            }
            style={{
              width: 300,
              height: 130,
              borderRadius: "10px",
              margin: "20px",
            }} // Ensure the card has a border radius
            bodyStyle={{ padding: 0, margin: 0, borderRadius: "10px" }} // Remove padding from the body
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "72px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "#ECEFF4", // Set the background color here
              }}
            >
              <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {groupsOwned.join(", ")}
              </p>
            </div>
          </Card>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "22px",
                }}
              >
                Groups Managed
              </div>
            }
            style={{
              width: 300,
              height: 130,
              borderRadius: "10px",
              margin: "20px",
            }} // Ensure the card has a border radius
            bodyStyle={{ padding: 0, margin: 0, borderRadius: "10px" }} // Remove padding from the body
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "72px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "#ECEFF4", // Set the background color here
              }}
            >
              <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {groupsManaged.join(", ")}
              </p>
            </div>
          </Card>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "22px",
                }}
              >
                Groups In
              </div>
            }
            style={{
              width: 300,
              height: 130,
              borderRadius: "10px",
              margin: "20px",
            }} // Ensure the card has a border radius
            bodyStyle={{ padding: 0, margin: 0, borderRadius: "10px" }} // Remove padding from the body
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "72px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "#ECEFF4", // Set the background color here
              }}
            >
              <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {groupsIn.join(", ")}
              </p>
            </div>
          </Card>
        </Flex>
      </Flex>
    );
  } catch (e) {}
}
