/* eslint-disable @next/next/no-img-element */
import { Card, Col, Rate, Row, Typography } from "antd";
import { useRouter } from "next/router";

import React, { useState } from "react";

const Home = ({ data }) => {
  // initial rating value
  const [viewAll, setViewAll] = useState(6);

  const handleViewAll = () => {
    if (viewAll <= 6) {
      setViewAll(data.length);
    } else {
      setViewAll(6);
    }
  };
  const router = useRouter();

  return (
    <>
      <div>
        <Row justify="space-between" style={{ marginTop: "20px" }}>
          <Col>
            <Typography.Title level={3} style={{ color: "grey" }}>
              All Books
            </Typography.Title>
          </Col>
          {data.length > 6 && (
            <Col>
              <Typography.Title
                onClick={handleViewAll}
                level={5}
                style={{ color: "grey", cursor: "pointer" }}
              >
                {viewAll <= 6 ? "View All" : "Show less"}
              </Typography.Title>
            </Col>
          )}
        </Row>
        <Row style={{ marginTop: "20px" }} gutter={[50, 30]}>
          {data?.map((item, i) => {
            if (i < viewAll) {
              return (
                <Col key={i}>
                  <Card
                    bordered={false}
                    style={{ width: 200, cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/book_details/${item.id}`);
                    }}
                  >
                    <div className="image-wrapper">
                      <img
                        alt="books"
                        src={item.thumbnail}
                        height={300}
                        width={200}
                      />
                    </div>
                    <Row style={{ marginTop: "10px" }}>
                      <Col xs={24}>
                        <Typography.Title level={5} ellipsis={true}>
                          {item.title}
                        </Typography.Title>
                        <Typography.Text style={{ color: "grey" }}>
                          J.K. rowling
                        </Typography.Text>
                      </Col>
                      <Col xs={24} style={{ marginTop: "10px" }}>
                        <Rate disabled allowHalf defaultValue={item.rating} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            }
          })}
        </Row>
      </div>
    </>
  );
};

export default Home;
