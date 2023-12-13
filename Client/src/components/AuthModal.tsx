import "@/styles/AuthModal.css";
import { request, useModel } from "@umijs/max";
import {
  Avatar,
  Button,
  Carousel,
  ColorPicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";

export default () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  const options = Array.from({ length: 53 }, (_, i) => ({
    label: <Avatar src={`https://xsgames.co/randomusers/assets/avatars/pixel/${i + 1}.jpg`} />,
    value: `https://xsgames.co/randomusers/assets/avatars/pixel/${i + 1}.jpg`,
  }));

  const loginHandler = async (data: any) => {
    setLoading(true);
    request("/api/auth/login", {
      method: "POST",
      data,
    })
      .then((result: any) => {
        if (result.status == 0) {
          localStorage.setItem("token", result.token);

          setInitialState({ ...initialState, ...result });
          refresh();
          location.reload();
        } else {
          message.error(result.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const registrationHandler = async (data: any) => {
    console.log(data);
    data.nickNameColor = data.nickNameColor.toHexString();
    setLoading(true);
    request("/api/auth/register", {
      method: "POST",
      data,
    })
      .then((result: any) => {
        if (result.status == 0) {
          localStorage.setItem("token", result.token);

          setInitialState({ ...initialState, ...result });
          refresh();
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
        type="link"
        style={{ color: "black" }}
        onClick={() => setIsModalOpen(true)}
      >
        Войти
      </Button>
      <Modal
        footer=""
        visible={isModalOpen}
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
                onFinish={loginHandler}
                autoComplete="off"
              >
                <Form.Item
                  label="Логин"
                  name="login"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[{ required: true }]}
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
                  <Button type="text" htmlType="submit" loading={loading}>
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
                onFinish={registrationHandler}
                autoComplete="off"
              >
                <Form.Item
                  label="Ник"
                  name="nickName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Логин"
                  name="login"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item label="Цвет никнейма" name="nickNameColor">
                  <ColorPicker />
                </Form.Item>
                <Form.Item label="Аватар" name="avatarImageUrl">
                  <Select
                    defaultValue="Выберите картинку"
                    style={{ width: 120 }}
                    options={options}
                  />
                </Form.Item>
                <Flex gap="large" justify="center">
                  <Button
                    type="text"
                    onClick={() => carouselRef.current.prev()}
                  >
                    Назад
                  </Button>
                  <Button type="text" htmlType="submit" loading={loading}>
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
