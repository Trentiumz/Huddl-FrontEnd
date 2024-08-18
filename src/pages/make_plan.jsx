import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Select, Typography, Row, Col, DatePicker, Space, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { add_plan_api, view_activities_api } from "../api.jsx"; 
import { isTemplateSpan } from "typescript";

const { RangePicker } = DatePicker;
const onOk = (value) => {
  console.log('onOk: ', value);
};

const { Title } = Typography;
const { Option } = Select;

export default function MakePlan() {
  const [predefinedOptions, setPredefinedOptions] = useState([]);
  const [form] = Form.useForm(); // Create a form instance
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  console.log("ID is " + id);
  var actIdChosen
  
  // Fetch predefined options from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const templates = await view_activities_api(Number(id)); // Fetches activities array
        const options = Object.keys(templates).map(key => ({
          label: templates[key].name,
          value: key,
          data: {
            name: templates[key].name,
            cost: templates[key].cost,
            location: templates[key].location,
            description: templates[key].description,
            link: templates[key].link,
            actId: templates[key].id
            
          },
        }));
        setPredefinedOptions(options);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        message.error("Failed to load activities");
      }
    };

    fetchActivities();
  }, [id]);

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    console.log(actIdChosen)

    let good = await add_plan_api(
      Number(id),
      actIdChosen,
      values.name,
      Number(values.cost),
      values.time[0].toISOString(), // Start time from RangePicker
      values.time[1].toISOString()  // End time from RangePicker
    );
    if (good) {
      navigate("/group?id=" + id);
      setTimeout(function () {
        window.location.reload();
      }, 600);
      message.success("Successfully created hangout!");
    }
  };

  const onOptionChange = (value) => {
    const selectedOption = predefinedOptions.find(option => option.value === value);
    actIdChosen = selectedOption.data.actId;
    if (selectedOption) {
      form.setFieldsValue(selectedOption.data); // Use the form instance to set field values
    }
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }} vertical="true">
      
        <Title level={2} style={{ textAlign: "center" }}>Create a Hangout</Title>
        <Form
          form={form} // Pass the form instance to the Form component
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          autoComplete="off"
        >
          <Form.Item label="Choose a Template">
            <Select
              placeholder="Select a template to autofill"
              onChange={onOptionChange} // Updated to only pass the value
            >
              {predefinedOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hangout Name"
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

          {/* Date and Time Range Picker */}
          <Form.Item
            label="Select Date and Time"
            name="time"  // The name should be singular for RangePicker
            rules={[{ required: true, message: "Please select the start and end time!" }]}
          >
            <RangePicker
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item label="Address" name="location">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Link" name="link">
            <Input />
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Add Hangout
              </Button>
            </Row>
          </Form.Item>
        </Form>
        <div style={{height:"20%"}}></div>
    </Flex>
  );
}
