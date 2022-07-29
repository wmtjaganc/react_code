import React from "react";
import {
  Col,
  Row,
  Typography,
  Space,
  Button,
  Avatar,
  Menu,
  Dropdown,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
const Navbar = () => {
  const router = useRouter();

  const handleAddBook = () => {
    router.push("/add_book");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/api/auth/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  const { user } = useUser();
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col xs={18} sm={6} md={4}>
          <Typography.Title level={2}>
            <Link href="/">Booksy</Link>
          </Typography.Title>
        </Col>
        <Col>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                router.push("/authors");
              }}
            >
              Authors
            </Button>

            {/* CASE:1 - if user is not logged in  */}
            {!user && (
              <>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    router.push("/api/auth/login");
                  }}
                >
                  Login
                </Button>
              </>
            )}

            {/* CASE:2 - if user is logged in  */}
            {user && (
              <>
                <Button type="primary" size="large" onClick={handleAddBook}>
                  Add a book
                </Button>
                <Dropdown
                  icon={<DownOutlined />}
                  overlay={menu}
                  placement="bottom"
                  arrow
                >
                  <Avatar
                    size="large"
                    style={{ cursor: "pointer" }}
                    src={user.picture}
                    alt={user.name}
                  />
                </Dropdown>
              </>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
