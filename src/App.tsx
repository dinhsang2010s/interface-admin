import { useState } from "react";
import "./App.less";
import { Link, Outlet } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import SearchModal from "./components/SearchModal";
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
            <div className="header-main">
              <div className="header-main-left flex">
                <Button
                  icon={<i className="fa fa-bars" aria-hidden="true"></i>}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ border: "unset", marginRight: 20 }}
                />
                <SearchModal title="Search all..." />
              </div>
              <div className="header-main-right flex">
                <div className="info-user">
                  <img className="w-full" src="/vite.svg" alt="" />
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              padding: "5px 30px",
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
