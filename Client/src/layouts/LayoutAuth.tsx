import Search from "@/components/Search";
import SideMenu from "@/constants/SideMenu";
import dropdownMenu from "@/constants/UserMenu";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space } from "antd";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("Главное меню");

  return (
    <Layout>
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
        <Dropdown menu={{ items: dropdownMenu }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined style={{ fontSize: '20px', color: 'white' }}/>
            </Space>
          </a>
        </Dropdown>
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
                      {child.name}
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
                  {item.name}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout style={{ margin: "16px 0", padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
