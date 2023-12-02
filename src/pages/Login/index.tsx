import "./style.less";
import { Button, Form, Input, Typography } from "antd";
const { Title } = Typography;

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <div className="login">
      <div className="login-banner h-full">
        <div className="login-banner-logo flex-center h-full">
          <img src="/auth.png" alt="" />
        </div>
      </div>
      <div className="login-form flex-center">
        <div className="login-form-description">
          <div className="login-form-logo">
            <img src="/vite.svg" alt="" />
          </div>
          <Title style={{ margin: "25px 0px 0px", letterSpacing: 3 }} level={4}>
            Welcome to vuexy!
          </Title>
          <Title style={{ fontWeight: 300, margin: "5px 0px 20px" }} level={5}>
            Please sign-in to your account and start the system!
          </Title>
        </div>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password style={{ height: 40 }} />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ height: 40, letterSpacing: 2, fontWeight: 400 }}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
