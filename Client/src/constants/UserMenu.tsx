import AuthModal from "@/components/AuthModal";
import { Button, MenuProps } from "antd";

const dropdownMenu: MenuProps["items"] = [
  {
    label: localStorage.getItem("token") ? (
      <Button
        type="link"
        onClick={() => logoutHandler}
        style={{ color: "black" }}
      >
        Настройка профиля
      </Button>
    ) : (
      <AuthModal/>
    ),
    key: "0",
  },
  localStorage.getItem("token")
    ? {
        type: "divider",
      }
    : null,
  {
    label: localStorage.getItem("token") ? (
      <a href="https://www.aliyun.com">Выйти</a>
    ) : null,
    key: "1",
  },
];

const logoutHandler = (data: any) => {
  localStorage.removeItem("token");
  setInitialState({});
};

export default dropdownMenu;
