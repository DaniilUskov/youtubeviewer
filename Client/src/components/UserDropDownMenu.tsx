import AuthModal from "@/components/AuthModal";
import { UserOutlined } from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { Avatar, Button, Col, Dropdown, MenuProps, Row, Space } from "antd";
import { useState } from "react";

const DropdownMenu = () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setInitialState({});
    refresh();
  };
  const dropdownMenu: MenuProps["items"] = [
    {
      label: localStorage.getItem("token") ? (
        <>
          <Row>
            <Col span={6}>
              <Avatar src={initialState?.avatarImageUrl} />
            </Col>
            <Col span={18}>
              <p style={{ color: initialState?.nickNameColor, marginTop:5 }}>
                {initialState?.nickName}
              </p>
            </Col>
          </Row>
        </>
      ) : null,
      key: "0",
    },
    {
      label: localStorage.getItem("token") ? (
        <Button type="link" style={{ color: "black" }}>
          Настройка профиля
        </Button>
      ) : (
        <AuthModal />
      ),
      key: "1",
    },
    localStorage.getItem("token")
      ? {
          type: "divider",
        }
      : null,
    {
      label: localStorage.getItem("token") ? (
        <Button type="link" onClick={handleLogout} style={{ color: "black" }}>
          Выйти
        </Button>
      ) : null,
      key: "2",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: dropdownMenu }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <UserOutlined style={{ fontSize: "20px", color: "white" }} />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
