import LayoutAuth from "@/layouts/LayoutAuth";
import "@/styles/index.css";
import { request, useAccess, useModel } from "@umijs/max";
import { Col, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ReactPlayer from "react-player";

export default () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const access = useAccess();
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <LayoutAuth>
        <Row>
          <Col span={18} className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              width="100%"
              height="80%"
              controls={true}
            />
            <p>Название видео</p>
          </Col>
          <Col span={6}>
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
                <TextArea
                  showCount
                  maxLength={100}
                  // onChange={onChange}
                  placeholder="Введите сообщение"
                  rows={2}
                  style={{ resize: "none", borderRadius: 0 }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </LayoutAuth>
    </>
  );
};
