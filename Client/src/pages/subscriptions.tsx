import LayoutAuth from "@/layouts/LayoutAuth";
import { Avatar, Card, Col, Flex, Pagination, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 2;

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    // Здесь вы можете загрузить новые данные для текущей страницы
    // const newData = maindata.slice((page - 1) * pageSize, page * pageSize);
    // setMainData(newData);
  };

  return (
    <>
      <LayoutAuth>
        <Row>
          <Col span={6}>
            <Card style={{ width: 300, margin: 25 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
        </Row>
        <Flex gap="large" justify="end">
          <Pagination
            current={currentPage}
            total={totalItems}
            onChange={handlePageChange}
          />
        </Flex>
      </LayoutAuth>
    </>
  );
};
