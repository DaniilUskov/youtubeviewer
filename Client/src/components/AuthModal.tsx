import "@/styles/AuthModal.css";
import { Button, Carousel, ColorPicker, Flex, Form, Input, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Войти
      </Button>
      <Modal
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Carousel ref={carouselRef}>
          <div>
            <Flex gap="large" align="center" vertical>
              <Title>Авторизация</Title>
              <Form
                layout="vertical"
                style={{ maxWidth: 600 }}
                //   onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Логин"
                  name="login"
                  rules={[
                    { required: true, message: "Please input your login!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Flex gap="large" justify="center">
                  <Button
                    type="text"
                    onClick={() => carouselRef.current.next()}
                  >
                    Регистрация
                  </Button>
                  <Button type="text" htmlType="submit">
                    Войти
                  </Button>
                </Flex>
              </Form>
            </Flex>
          </div>
          <div>
            <Flex gap="small" align="center" vertical>
              <Title>Регистрация</Title>
              <Form
                style={{ maxWidth: 600 }}
                layout="vertical"
                //   onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Ник"
                  name="nickName"
                  rules={[
                    { required: true, message: "Please input your nickname!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Логин"
                  name="login"
                  rules={[
                    { required: true, message: "Please input your login!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item label="Цвет никнейма" name="nickNameColor">
                  <ColorPicker />
                </Form.Item>
                <Flex gap="large" justify="center">
                  <Button
                    type="text"
                    onClick={() => carouselRef.current.prev()}
                  >
                    Назад
                  </Button>
                  <Button type="text" htmlType="submit">
                    Зарегистрироваться
                  </Button>
                </Flex>
              </Form>
            </Flex>
          </div>
        </Carousel>
      </Modal>
    </>
  );
};
