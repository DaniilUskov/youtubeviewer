import { MenuProps } from "antd";

const dropdownMenu: MenuProps['items'] = [
 {
   label: <a href="https://www.antgroup.com">Настройка профиля</a>,
   key: "0",
 },
 {
   type: "divider",
 },
 {
   label: <a href="https://www.aliyun.com">Выйти</a>,
   key: "1",
 },
];

export default dropdownMenu;
