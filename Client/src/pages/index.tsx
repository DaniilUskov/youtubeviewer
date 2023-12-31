import VideoDropDown from "@/components/VideoDropDown";
import LayoutAuth from "@/layouts/LayoutAuth";
import "@/styles/index.css";
import { request, useModel } from "@umijs/max";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

export default () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState({});
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const getCurrentSeccions = () => {
    setLoading(true);
    request(`/api/session/GetAllFutureSessions`)
      .then((result: any) => {
        setSessions(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getCurrentSeccions(), []);

  return (
    <>
      <LayoutAuth>
        <Title style={{ margin: 10 }}>Скоро в эфире</Title>
        <Row>
          {Object.entries(sessions).map(([key, value], index) => (
            <Col span={8}>
              <Card
                hoverable
                style={{ margin: 15 }}
                cover={
                  <img
                    onClick={() => {
                      window.location.href = `/video/${value.id}`;
                    }}
                    alt="Ошибочка произошла"
                    src={`https://i.ytimg.com/vi/${
                      value.video.url.split("=")[1]
                    }/hqdefault.jpg`}
                  />
                }
                actions={[
                  <VideoDropDown
                    videoId={value.video.id}
                    onOpen={() => setIsDropDownOpen(true)}
                    onClose={() => setIsDropDownOpen(false)}
                  />,
                ]}
              >
                <Meta
                  title={value.video.title}
                  description={"Начало: " + value.date}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </LayoutAuth>
    </>
  );
};
