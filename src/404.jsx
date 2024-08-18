import * as React from "react";
import { Flex, Typography } from 'antd';
const { Title, Paragraph } = Typography;

export default function App() {
  return(
    <Flex align="center" justify="center" vertical="true" style={{ height: "100%", width:"100%" }}>
    <Title>
      404 PAGE NOT FOUND
    </Title>
    <Paragraph>
      The page you are looking for does not exist.
    </Paragraph>
    </Flex>
  )
    
  
}