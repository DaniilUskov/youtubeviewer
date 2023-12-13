import { DownOutlined } from "@ant-design/icons";
import { request } from "@umijs/max";
import { Dropdown, MenuProps, Space, message } from "antd";

export default (videoId: any) => {
  const items: MenuProps["items"] = [
    {
      label: "Смотреть позже",
      key: "1",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    request(`/api/video/AddVideoToUserSubscriptions`, {
      method: "POST",
      data: { id: videoId.videoId },
    }).then((result: any) => {
      if (result.status == 1) {
        message.warning(`Видео уже добавлено`);
      } else {
        message.info(`Видео добавлено в "Смотреть позже"`);
      }
    });
  };

  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};
