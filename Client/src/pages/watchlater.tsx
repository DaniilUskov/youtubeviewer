import DeleteVideoModal from "@/components/DeleteSessionModal";
import DeleteVideoFromSubs from "@/components/DeleteVideoFromSubs";
import UpdateSessionDateModal from "@/components/UpdateSessionDateModal";
import LayoutAuth from "@/layouts/LayoutAuth";
import { SettingOutlined } from "@ant-design/icons";
import { request, useModel } from "@umijs/max";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

export default () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 2;
  const [loading, setLoading] = useState(false);

  const [subscribedVideos, setSubscribedVideos] = useState({});

  const getUsersSubscribedVideos = () => {
    setLoading(true);
    request(`/api/video/GetUsersSubscribedVideos`)
      .then((result: any) => {
        setSubscribedVideos(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getUsersSubscribedVideos(), []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    // Здесь вы можете загрузить новые данные для текущей страницы
    // const newData = maindata.slice((page - 1) * pageSize, page * pageSize);
    // setMainData(newData);
  };

  return (
    <LayoutAuth>
      <Row justify="space-between">
        <Col>
          <Title style={{ margin: 10 }}>Смотреть позже</Title>
        </Col>
      </Row>
      <Row>
        {Object.entries(subscribedVideos).map(([key, value], index) => (
          <Col span={8}>
            <Card
              hoverable
              style={{ margin: 15 }}
              cover={
                <img
                  alt="Ошибочка произошла"
                  onClick={() => {
                    window.location.href = `/video/${value.id}`;
                  }}
                  src={`https://i.ytimg.com/vi/${
                    value.video.url.split("=")[1]
                  }/hqdefault.jpg`}
                />
              }
              actions={[
                <DeleteVideoFromSubs id={value.video.id} />,
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
  );
};
