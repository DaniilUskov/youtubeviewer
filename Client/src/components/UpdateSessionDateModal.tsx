import { SettingOutlined } from "@ant-design/icons";
import { request, useModel } from "@umijs/max";
import { Button, DatePicker, Flex, Form, Modal, Space, message } from "antd";
import { useState } from "react";

export default (id: any) => {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateUpdateHandler = async (data: any) => {
    setLoading(true);
    request(`/api/session/UpdateSessionDate`, {
      method: "POST",
      data: {id : id.id, date : data.date}
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space wrap>
        <Button
          type="link"
          icon={<SettingOutlined />}
          style={{ color: "GrayText" }}
          onClick={() => setIsModalOpen(true)}
        ></Button>
        <Modal
          footer=""
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h2>Изменение даты трансляции</h2>
          <Form
            layout="vertical"
            style={{ maxWidth: 600 }}
            onFinish={dateUpdateHandler}
            autoComplete="off"
          >
            <Form.Item
              label="Дата трансляции"
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Flex gap="large" justify="center">
              <Button type="text" htmlType="submit" loading={loading}>
                Обновить
              </Button>
            </Flex>
          </Form>
        </Modal>
      </Space>
    </>
  );
};
