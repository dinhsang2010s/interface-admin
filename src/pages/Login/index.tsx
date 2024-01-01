import { useState } from "react";
import "./style.less";
import { Button, Form, Input, Typography, message } from "antd";
import { useSleep } from "../../hooks/useSleep";
import { useLogin } from "../../api/auth";
const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    useLogin(values)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.accessToken);
          window.location.replace("/dashboard");
        }
        useSleep(10).then(() => setLoading(false));
      })
      .catch((ex: any) => {
        message.error(ex.message);
        setLoading(false);
      });
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
            Welcome to system admin!
          </Title>
          <Title style={{ fontWeight: 300, margin: "5px 0px 20px" }} level={5}>
            Please sign-in to your account and start the system admin!
          </Title>
        </div>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be minimum 6 characters!" },
            ]}
          >
            <Input.Password style={{ height: 40 }} />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ height: 40, letterSpacing: 2, fontWeight: 400 }}
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
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
