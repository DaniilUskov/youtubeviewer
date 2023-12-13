import { request } from "@umijs/max";
import { useModel } from "@umijs/max";
import { Button, DatePicker, Flex, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export default () => {
    const { initialState, setInitialState, refresh } = useModel("@@initialState");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const videoHandler = async (data: any) => {
      data.addedByUserId = initialState?.userId;
        setLoading(true);
        request("/api/session/PlanSession", {
          method: "POST",
          data,
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
      <Button
        block
        style={{ color: "black"}}
        onClick={() => setIsModalOpen(true)}
      >
        Добавить трансляцию
      </Button>
      <Modal
        footer=""
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={videoHandler}
          autoComplete="off"
        >
          <Form.Item label="Ссылка" name="addedByUserId" style={{display: "none"}}>
            <Input value={initialState?.userId}/>
          </Form.Item>
          <Form.Item
            label="Название видео"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ссылка" name="url" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Дата трансляции"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Flex gap="large" justify="center">
            <Button type="text" htmlType="submit" loading={loading}>
              Запланировать
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};
