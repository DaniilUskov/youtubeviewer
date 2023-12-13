import Search from "@/components/Search";
import DropdownMenu from "@/components/UserDropDownMenu";
import SideMenu from "@/constants/SideMenu";
import { Link } from "@umijs/max";
import { Layout, Menu } from "antd";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("Главное меню");

  return (
    <Layout style={{height: "100vh"}}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#30333A",
        }}
      >
        <div className="demo-logo" />
        <Search />
        <DropdownMenu />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{ background: "#30333A" }}
        >
          {" "}
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              background: "#30333A",
              color: "white",
            }}
          >
            {SideMenu.map((item, index) =>
              item.children ? (
                <Menu.SubMenu key={index} icon={item.icon} title={item.name}>
                  {item.children.map((child, index) => (
                    <Menu.Item
                      key={`${child.name}-${index}`}
                      icon={child.icon}
                      title={child.name}
                      onClick={() => setSelectedKey(`${child.name}-${index}`)}
                    >
                      <Link to={child.link}>{child.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={`${item.name}-${index}`}
                  icon={item.icon}
                  title={item.name}
                  onClick={() => setSelectedKey(`${item.name}-${index}`)}
                >
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
