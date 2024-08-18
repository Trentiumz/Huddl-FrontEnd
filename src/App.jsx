import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ReactDOM from "react-dom/client";
import Landing from "./pages/landing.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup.jsx";
import DefaultMenu from "./DefaultMenu.jsx";
import NoPage from "./404.jsx";
import Group from "./pages/group.jsx";
import AccountPage from "./pages/account_page.jsx";
import GroupPage from "./pages/grouppage.jsx";
import MakePlan from "./pages/make_plan.jsx";
import AddActivity from "./pages/add_activity.jsx";
import { ConfigProvider } from "antd";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorPrimary: "#5e81ac",
          colorSuccess: "#a3be8c",
          colorWarning: "#bf616a",
          colorBgContainer: "#cbd3e2",
          colorBgBase: "#d8dee9",
          borderRadius: 7,
        },
        components:{
          Input:{
            colorBgContainer:"#eceff4"
          },
          Card:{
            colorBorderSecondary:"#4c566a"
          }
        }
      }}
    >
      
      <main id="main" style={{display:"flex", flexDirection:"row"}}>
          
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/" element={<DefaultMenu />}>
              <Route path="login" element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="group/*" element={<Group />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="grouppage" element={<GroupPage />} />
              <Route path="makeplan" element={<MakePlan />} />
              <Route path="addactivity" element={<AddActivity />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </ConfigProvider>
  );
}
