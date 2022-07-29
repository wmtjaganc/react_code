import { Avatar, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/axios/api";

const Authors = () => {
  const [author, setAuthors] = useState();
  //fetch api for Authors
  const getAuthor = async () => {
    const resp = await api.get("Authors");
    setAuthors(resp.data);
  };
  //calling the authors api only first time when user visits page
  useEffect(() => {
    getAuthor();
  }, []);
  return (
    <>
      <Row>
        <Col xs={24} style={{ marginBottom: "20px" }}>
          <Typography.Title level={3} style={{ color: "grey" }}>
            Popular Authors
          </Typography.Title>
        </Col>

        {/* Details of authors iterated from the results got from API */}
        {author?.map((item, i) => {
          return (
            <Col key={i}>
              <div style={{ width: "150px" }}>
                <Avatar
                  style={{
                    display: "block",
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                  size="large"
                  src={item.profile}
                />
                <Typography.Text ellipsis style={{ wordBreak: "break-word" }}>
                  {item.Name}
                </Typography.Text>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Authors;
