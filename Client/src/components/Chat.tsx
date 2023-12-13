import Role from "@/enums/Role";
import {
  CrownOutlined,
  ScissorOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { request, useModel } from "@umijs/max";
import { Avatar, Button, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

export default (sessionId: any) => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [newMessage, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState({});
  const [connection, setConnection] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSessionMessages = () => {
    setLoading(true);
    request(`/api/session/getsessionlastmessagesbyid/${sessionId.sessionId}`)
      .then((result: any) => {
        setChatMessages(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getSessionMessages(), []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5019/chat")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.on("ReceiveMessage", function (message) {
          setChatMessages((prevMessages) => [...prevMessages, message]);
        });
      })
      .catch((err) => console.error(err));

    setConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  const sendMessage = (message: string) => {
    const currentSessionId: Number = Number(sessionId.sessionId);
    const userId = initialState?.userId;
    const messageObj = {
      sessionId: currentSessionId,
      userId: userId,
      message: message,
    };
    connection.invoke("SendMessage", messageObj).catch(function (err: any) {
      console.log(err);
    });
  };
  const messageEndRef = React.useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const banUserById = (id: number) => {
    request(`/api/session/BanUserById`, {
      method: "POST",
      data: { id: id },
    })
      .then((result: any) => {
        getSessionMessages();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const makeUserAdminById = (id: number) => {
    request(`/api/session/makeUserAdminById`, {
      method: "POST",
      data: { id: id },
    })
      .then((result: any) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteMessageFromChat = (id: number) => {
    request(`/api/session/DeleteMessageFromChat/${id}`, {
      method: "DELETE",
    })
      .then((result: any) => {
        getSessionMessages();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          height: "100%",
          width: "100%",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              marginBottom: "10px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              height: "80vh",
              overflow: "auto",
            }}
          >
            {Object.entries(chatMessages).map(([key, value], index) => (
              <p key={index} style={{ padding: 5 }}>
                {value.date} <Avatar src={value.user.avatarImageUrl} />{" "}
                <span style={{ color: value.user.nickNameColor }}>
                  {initialState?.role == Role.admin ? (
                    <Popover
                      content={
                        <div>
                          <p>
                            <Button
                              type="link"
                              icon={<ScissorOutlined />}
                              onClick={() => deleteMessageFromChat(value.id)}
                              style={{ color: "GrayText" }}
                            >
                              Удалить сообщение
                            </Button>
                          </p>
                          <p>
                            <Button
                              type="link"
                              icon={<UserDeleteOutlined />}
                              onClick={() => banUserById(value.user.id)}
                              style={{ color: "GrayText" }}
                            >
                              Заблокировать пользователя
                            </Button>
                          </p>
                          <p>
                            <Button
                              type="link"
                              icon={<CrownOutlined />}
                              onClick={() => makeUserAdminById(value.user.id)}
                              style={{ color: "GrayText" }}
                            >
                              Сделать администратором
                            </Button>
                          </p>
                        </div>
                      }
                      trigger="click"
                    >
                      <Button
                        style={{
                          color: value.user.nickNameColor,
                          backgroundColor: "transparent",
                          borderWidth: 0,
                          boxShadow: "none",
                          padding: -10,
                          margin: -10,
                        }}
                      >
                        {value.user.nickName}:
                      </Button>
                    </Popover>
                  ) : (
                    value.user.nickName
                  )}
                </span>
                {": "}{value.text}
              </p>
            ))}
            <div ref={messageEndRef} />
          </div>
          <TextArea
            showCount
            maxLength={100}
            value={newMessage}
            onPressEnter={(e) => {
              e.preventDefault();
              sendMessage(newMessage);
              setMessage("");
            }}
            placeholder="Введите сообщение"
            rows={2}
            style={{ resize: "none", borderRadius: 0 }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
