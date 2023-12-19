import { useEffect, useState } from "react";
import "./App.less";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import SearchModal from "./components/SearchModal";
const { Header, Content, Sider } = Layout;
import { useLocation } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import { useSleep } from "./hooks/useSleep";
import { useGetProfile } from "./api/auth";

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
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth)
      useGetProfile().then((res: any) => {
        if (res.id) setAuth(true);
      });

    useSleep(10).then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      {auth ? (
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
                selectedKeys={[
                  location.pathname.split("/")?.[1] || "dashboard",
                ]}
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
                  background: "var(--bg-component)",
                  boxShadow: "var(--box-shadow)",
                  borderRadius: 6,
                  margin: "0px 24px 16px",
                  padding: 20,
                  overflow: "hidden",
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default App;
