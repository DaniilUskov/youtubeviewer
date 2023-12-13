import VideoDropDown from "@/components/VideoDropDown";
import LayoutAuth from "@/layouts/LayoutAuth";
import { request, useModel, useParams } from "@umijs/max";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
export default () => {
  const { initialState } = useModel("@@initialState");
  const params = useParams();
  const searchName = params?.name;

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState({});
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const getSearchedVideos = () => {
    setLoading(true);
    request(`/api/video/getVideosByName/${searchName}`)
      .then((result: any) => {
        setVideos(result);
        console.log(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getSearchedVideos(), []);

  return (
    <>
      <LayoutAuth>
        <Row style={{ height: "90vh" }}>
          {Object.entries(videos).map(([key, value], index) => (
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
                      value.url.split("=")[1]
                    }/hqdefault.jpg`}
                  />
                }
                actions={[
                  <VideoDropDown
                    videoId={value.id}
                    onOpen={() => setIsDropDownOpen(true)}
                    onClose={() => setIsDropDownOpen(false)}
                  />,
                ]}
              >
                <Meta
                  title={value.title}
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
