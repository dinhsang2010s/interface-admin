import { useState } from "react";
import "./App.less";
import { Link, Outlet } from "react-router-dom";
import { Input, Layout, Menu } from "antd";
import { Avatar, Badge, Space } from "antd";
const { Header, Content, Sider } = Layout;

const menu = [
  {
    key: "dashboard",
    icon: <i className="fa-solid fa-house"></i>,
    label: "Dashboard",
  },
  {
    key: "category",
    icon: <i className="fa-solid fa-table-list"></i>,
    label: "Categories",
  },
  {
    key: "post",
    icon: <i className="fa-solid fa-newspaper"></i>,
    label: "Posts",
  },
  {
    key: "user",
    icon: <i className="fa-solid fa-users-gear"></i>,
    label: "Users",
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="App">
      <Layout className="main" style={{ minHeight: "100vh" }}>
        <Sider
          width={250}
          className="slider"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <img src="/vite.svg" alt="" />
          </div>
          <Menu
            className="menu"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
          >
            {menu.map((m) => (
              <Menu.Item className="menu-item" key={m.key} icon={m.icon}>
                <Link className="link-item" to={m.key}>
                  {m.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <div className="start">
              <h2>hello</h2>
            </div>
            <div className="search-global">
              <Input
                placeholder="Search..."
                prefix={
                  <i
                    style={{ padding: "0px 10px 0px 5px", color: "#989393" }}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                }
              />
            </div>
            <div className="badge">
              <Space size="small">
                <Badge count={99}>
                  <Avatar shape="square" size="default" />
                </Badge>
                <Badge count={100}>
                  <Avatar shape="square" size="default" />
                </Badge>
                <Badge count={99} overflowCount={10}>
                  <Avatar shape="square" size="default" />
                </Badge>
                <Badge count={1000} overflowCount={999}>
                  <Avatar shape="square" size="default" />
                </Badge>
              </Space>
            </div>
          </Header>
          <Content
            style={{
              padding: "0px 30px",
              overflow: "hidden",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
