import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { request } from "@umijs/max";
import { Button, Modal, Space, message } from "antd";
import { useState } from "react";

const { confirm } = Modal;

export default (id: any) => {
  const [loading, setLoading] = useState(false);

  const deleteVideoHandler = async () => {
    setLoading(true);
    request(`/api/video/deleteVideoFromSubs/${id.id}`, {
      method: "DELETE",
    })
      .then((result: any) => {
        if (result.status == 0) {
          location.reload();
        } else {
          message.error(result.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showConfirm = () => {
    confirm({
      title: "Вы действительно хотите удалить подписку?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        deleteVideoHandler();
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Space wrap>
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={showConfirm}
          style={{ color: "GrayText" }}
        ></Button>
      </Space>
    </>
  );
};
