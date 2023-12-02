import {
    ClockCircleFilled,
  HomeFilled,
  PlayCircleFilled,
  VideoCameraFilled,
  YoutubeFilled,
} from "@ant-design/icons";

export default [
  {
    name: "Главная",
    link: "/mainpage",
    icon: <HomeFilled />,
  },
  {
    name: "Подписки",
    link: "/subscriptions",
    icon: <YoutubeFilled />,
  },
  {
    name: "Мой канал",
    link: "/mychanel",
    icon: <VideoCameraFilled />,
    children: [
      {
        name: "Трансляции",
        link: "/live",
        icon: <PlayCircleFilled />,
      },
      {
        name: "Смотреть позже",
        link: "/watchlater",
        icon: <ClockCircleFilled />,
      },
    ],
  },
];
