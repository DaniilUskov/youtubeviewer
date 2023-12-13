import AddVideoModal from "@/components/AddSessionModal";
import DeleteVideoModal from "@/components/DeleteSessionModal";
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

  const [sessions, setSessions] = useState({});

  const getUserPlannedSessions = () => {
    setLoading(true);
    request(`/api/session/GetSessionsByUserId/${initialState?.userId}`)
      .then((result: any) => {
        setSessions(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getUserPlannedSessions(), []);

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
          <Title style={{ margin: 10 }}>Запланированные трансляции</Title>
        </Col>
        <Col style={{ margin: 10, paddingRight: 10 }}>
          <AddVideoModal />
        </Col>
      </Row>
      <Row>
        {Object.entries(sessions).map(([key, value], index) => (
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
                <UpdateSessionDateModal id={value.id}/>,
                <DeleteVideoModal id={value.id} />,
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
