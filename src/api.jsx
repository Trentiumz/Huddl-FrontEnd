import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Checkbox, Form, Input, message, Flex, Typography } from "antd";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";

const getSessionID = () => {
  // Create a regular expression to match the cookie name
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${"sessionid"}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null; // Return null if cookie is not found
};
// Example usage to get the CSRF token

var sessionID = ""

export const login_api = async (values) => {
  try {
    //const navigate = useNavigate();

    // Example POST request to your login endpoint
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Pass form values as JSON string
      },
    );

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();

    // Handle successful login
    message.success("Login successful!");
    console.log("Success:", data);
    
    sessionID = data.session_id
    //navigate("/home");
    //navigate("/home"); //navigate doesnt work. WIll fix later
    console.log("sessionid=" + data.session_id + ";")
    document.cookie = "sessionid=" + data.session_id + ";"
    document.cookie = "csrftoken=" + data.csrf_token + ";"
    return true
  } catch (error) {
    // Handle errors
    message.error("Login failed: " + error.message);
    return false
  }
};

export const signup_api = async (values) => {
  console.log(values);
  const login_data = {
    email: values.email,
    password: values.password,
    username: values.username,
    full_name: values.name,
  };
  try {
    var errors = 0;
    // Example POST request to your login endpoint
    if (values.password != values.passwordRepeat) {
      message.error("Passwords do not match!");
      errors++;
    }
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login_data), // Pass form values as JSON string
      },
    );
    // Handle errors
    const res = await response.json();
    try {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const array = res[key];
          array.forEach((value) => {
            console.log(`Key: ${key}, Value: ${value}`);
            message.error(value);
            errors++;
          });
        }
      }
    } catch (e) {}
    // Handle successful login
    if (errors == 0) {
      message.success("Signup successful!");
    }
    //navigate("/home"); //navigate doesnt work. WIll fix later
  } catch (error) {
    message.error("Signup failed: " + error.message);
  }
};

export const is_loggedin_api = async () => {
  sessionID = getSessionID()
  try {
    // Example POST request to your login endpoint
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/signed-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sessionid: sessionID,
        }), 
      },
    );

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    return true
  } catch (error) {
    // Handle errors
    message.error("Login failed: " + error.message);
    return false
  }
};

export const getuser_api = async () => {
  sessionID = getSessionID()
  try {
    // Example POST request to your login endpoint
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/my-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {
          sessionid: sessionID
        }), // Pass form values as JSON string
      },
    );

    const data = await response.json();
    // Handle successful login
    console.log("Success:", data);
    return data;
    //navigate("/home"); //navigate doesnt work. WIll fix later
  } catch (error) {
    // Handle errors
    message.error("Failed to get user information: " + error.message);
  }
};

//need name, if joining is enabled, and whether or not a join id is wanted
export const make_group_api = async (name, join_enabled, description) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            name: name,
            join_enabled: join_enabled,
            description: description
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    message.success("Successfully created group!");
    console.log("Success:", data);
    return true
  } catch (error) {
    // Handle errors
    message.error("Failed to create group: " + error.message);
    return false
  }
};

export const logout_api = async () => {
  try {
    //const navigate = useNavigate();

    // Example POST request to your login endpoint
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Logout failed!");
    }

    const data = await response.json();

    // Handle successful login
    message.success("Successfully logged out!");
    console.log("Success:", data);
    sessionID = null
    return true
  } catch (error) {
    // Handle errors
    message.error("Logout failed: " + error.message);
    return false
  }
};

//need id: group id as string, detailed: true/false
export const group_info_api = async (group_id, detailed) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/group-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: group_id,
            detailed: detailed
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Success:", data);
    return [data]
  } catch (error) {
    // Handle errors
    message.error("Failed to get group information: " + error.message);
    return false
  }
};

//need id: group id as string, detailed: true/false
export const group_info_admin_api = async (id, detailed) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/admin-group-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            detailed: detailed
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Success:", data);
    return [data]
  } catch (error) {
    // Handle errors
    message.error("Failed to get group information: " + error.message);
    return false
  }
};

//need join_id: group join id as string
export const join_group_api = async (join_id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/join-group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            join_id: join_id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    message.success("Succesfully joined group!");
    // Handle successful login
    console.log("Successfuly:", data);
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not join group: " + error.message);
    return false
  }
};
//need id: group id as string
export const leave_group_api = async (group_id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/leave-group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            group_id: group_id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successful:", data);
    message.success("Succesfully left group!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not leave group: " + error.message);
    return false
  }
};

//need id: id of the club, promote_username: username of the person to promote to admin
export const promote_member_api = async (id, promote_username) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/promote-member",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            promote_username: promote_username
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully promoted member!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not promote member: " + error.message);
    return false
  }
};

//need id: id of the club, remove_username: username of the person to remove
export const remove_member_api = async (id, remove_username) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/remove-member",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            remove_username: remove_username
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully removed member!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not remove member: " + error.message);
    return false
  }
};

//need id: id of the club
export const delete_club_api = async (id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/delete-group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully deleted group!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not delete group: " + error.message);
    return false
  }
};

//need id: id of the club, new_owner_username: name of new owner
export const transfer_ownership_api = async (id, new_owner_username) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/transfer-group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            new_owner_username: new_owner_username
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully updated group!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not update group: " + error.message);
    return false
  }
};

//need username, full_name, old_password, new_password. Leave everything blank if you don't want to change it
export const update_user_api = async (username, full_name, old_password, new_password) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/update-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            username: username,
            full_name: full_name,
            old_password: old_password,
            new_password: new_password
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully updated information!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not update information: " + error.message);
    return false
  }
};

//need id: id of club, join_enabled: whether joining is enabled
export const update_join_status_api = async (id, join_enabled) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/change-join-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            join_enabled: join_enabled
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully updated group!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not update group: " + error.message);
    return false
  }
};

//need id: id of club
//Returns: {member: is member, admin: is admin, owner: is owner}
export const user_status_in_group_api = async (id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/my-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    return [data]
  } catch (error) {
    // Handle errors
    message.error("Could not get user information: " + error.message);
    return false
  }
};

//need id: id of club
export const get_member_group_profile_api = async (id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/view-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    return [data]
  } catch (error) {
    // Handle errors
    message.error("Could not get member information: " + error.message);
    return false
  }
};

//need id: club, budget_limit (optional), maximum_time (optional)
export const set_member_group_profile_api = async (id, budget_limit, maximum_time) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/edit-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            budget_limit: budget_limit,
            maximum_time: maximum_time
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    message.success("Succesfully updated information!");
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not update information: " + error.message);
    return false
  }
};

//need id: club id, cost, time, name, description (optional), link (optional)
export const add_activity_api = async (id, name, cost, time, location, description, link) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/add-activity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            cost: cost,
            time: time,
            name: name,
            location: location,
            description: description,
            link: link
         
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not add activity: " + error.message);
    return false
  }
};

//need id: club id
export const view_activities_api = async (id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/view-activities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Data from activity viewing:", data);
    return data
  } catch (error) {
    // Handle errors
    message.error("Could not view activities: " + error.message);
    return false
  }
};

export const add_plan_api = async (id, activity_id, name, cost, start_time, end_time) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/add-plan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id,
            activity_id: activity_id,
            cost: cost,
            name: name,
            start_time: start_time,
            end_time: end_time
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Successfuly:", data);
    return true
  } catch (error) {
    // Handle errors
    message.error("Could not add plan: " + error.message);
    return false
  }
};

//need id: club id
export const view_plans_api = async (id) => {
  sessionID = getSessionID()
  console.log(sessionID)
  try {
    const response = await fetch(
      "https://331e5920-fbaa-4a79-8eb4-42c550affd2d-00-fxlr5i1nqm3l.picard.replit.dev/groups/view-plans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            sessionid: sessionID,
            id: id
          }), 
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    // Handle successful login
    console.log("Data from activity viewing:", data);
    return data
  } catch (error) {
    // Handle errors
    message.error("Could not view plans: " + error.message);
    return false
  }
};