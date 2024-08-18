import { Menu, Space, Layout, Flex, theme, Button, Modal } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { is_loggedin_api, logout_api } from "./api.jsx";
import logo from "./assets/huddlLiteText.png";

const { Sider, Header, Content } = Layout;

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LoginOutlined,
  TeamOutlined,
  HomeOutlined
} from "@ant-design/icons";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const loggedInItems = [
  {
    key: "4",
    label: "Home",
    icon: <HomeOutlined />,
    path: "/home",
  },
  {
    key: "1",
    label: "Account",
    icon: <UserOutlined />,
    path: "/account", // Define the route path for Home
  },
  {
    key: "3",
    label: "Groups",
    icon: <TeamOutlined />,
    path: "/grouppage",
  },
 
  {
    key: "5",
    label: "Sign Out",
    icon: <LoginOutlined />,
    signout: 1,
  },
];

const defaultItems = [
  {
    key: "4",
    label: "Home",
    icon: <TeamOutlined />,
    path: "/home",
  },
  {
    key: "2",
    label: "Login/Signup",
    icon: <LoginOutlined />,
    path: "/login", // Define the route path for Login
  }
];

export const useForceUpdate = () => {
  const [, setToggle] = useState(false);
  return () => setToggle(toggle => !toggle);
}

export default function DefaultMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  
  let loggedIn = false
  if(getCookie("sessionid") != ""){
    loggedIn = is_loggedin_api()
  }
  
  const signOut = () => {
    let res = logout_api();
    if (res) {
      document.cookie =
        "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    }
  };
  // Find the label for the current path
  let items = [];
  if (loggedIn) {
    items = loggedInItems;
  } else {
    document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    items = defaultItems;
  }
  const [currentKey, setCurrentKey] = useState(
    items.find((item) => item.path === location.pathname)?.key || -1,
  );
  // clean up the items array for only the stuff required
  const menuItems = items.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    children: item.children,
  }));

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logoClicked = () => {
    navigate("/");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    signOut();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Modal title="Sign Out" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to sign out?</p>
      </Modal>
      <Layout style={{ display: "flex", objectFit: "contain", overflow:"hidden"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Flex
            style={{ width: "auto", height: "auto" }}
            justify="center"
            gap="small"
          >
            <img
              src={logo}
              style={{
                width: "75%",
                height: "75%",
                objectFit: "contain",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={logoClicked}
            ></img>
          </Flex>
          <Menu
            theme="dark"
            defaultSelectedKeys={currentKey}
            items={menuItems}
            onClick={({ key }) => {
              let item = items.find((element) => element.key == key);
              if (item && item.path) navigate(item.path);
              else if (item && item.signout) showModal();
            }}
            mode="inline"
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              paddingLeft: 24,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <a onClick={(e) => e.preventDefault()}>
        <Space></Space>
      </a>
    </>
  );
}
