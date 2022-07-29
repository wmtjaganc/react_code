/* eslint-disable @next/next/no-img-element */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Col,
  Rate,
  Row,
  Typography,
  Tag,
  Button,
  message,
  Modal,
  Form,
  InputNumber,
  Select,
  Input,
  Option,
  notification,
} from "antd";
import confirm from "antd/lib/modal/confirm";
import { useRouter } from "next/router";
import React, { useState } from "react";
import api from "../api/axios/api";

const BookDetails = ({ Book }) => {
  const router = useRouter();

  const { user } = useUser(); //for Authorization purpose

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openNotificationWithIcon = (type, text) => {
    notification[type]({
      message: type.toLocaleUpperCase(),
      description: text,
    });
  };
  const deleteBook = async (id) => {
    //This will delete the required book
    try {
      api.delete(`TotalBooks/${id}`);
      message.success("Deleted Succesfully!");
      router.push("/");
    } catch {
      message.error("Something went wrong!");
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("Book?.data", Book);
  const onFinish = async (values) => {
    //This will Update the Book details with local DB
    const finalData = {
      title: values.Title,
      authors: [values.Author],
      publisher: values.Publisher,
      pageCount: values.number,
      thumbnail: values.URL,
      language: values.Language,
      description: values.Description,
      rating: values.rate,
    };
    try {
      const response = await api.put(`TotalBooks/${Book.id}`, finalData);
      const resp = await response.data;
      if (resp) {
        openNotificationWithIcon(
          "success",
          "Book Updated Successfully to Database"
        );
        router.push("/");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something went wrong!");
      console.log("error", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please provide valid information!");
    console.log("Failed:", errorInfo);
  };
  function showDeleteConfirm() {
    //Confirm box for deleting book
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteBook(Book.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <>
      <Row justify="center">
        <Col xs={24} md={6}>
          <img
            src={Book.thumbnail}
            alt=""
            width="300px"
            height="auto"
            className="coverImg"
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography.Title>{Book.title}</Typography.Title>
          <Typography.Title level={5} style={{ color: "grey" }}>
            ~{Book?.authors?.map((item) => item)}
          </Typography.Title>

          <Tag
            style={{ display: "inline-block", marginRight: "20px" }}
            color="#f50"
          >
            {Book?.language}
          </Tag>
          <Rate value={Book?.rating} allowHalf disabled />
          <br />
          <br />
          <Typography.Title level={5} style={{ color: "grey" }}>
            Page Count: {Book?.pageCount}
          </Typography.Title>
          <Typography.Text style={{ color: "grey" }}>
            {Book?.description}
          </Typography.Text>
          {user && (
            <>
              <Button
                type="primary"
                onClick={showModal}
                style={{ display: "block", marginTop: "30px" }}
              >
                Edit Content
              </Button>
              <Button
                type="primary"
                danger
                style={{ display: "block", marginTop: "30px" }}
                onClick={showDeleteConfirm}
              >
                Delete Book
              </Button>
            </>
          )}
        </Col>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          centered
          footer={false}
          onCancel={handleCancel}
        >
          <Form
            name="bookform"
            className="addbook-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              Title: Book?.title,
              URL: Book?.thumbnail,
              Author: Book?.authors?.[0],
              Publisher: Book?.publisher,
              Description: Book?.description,
              Language: Book?.language,
              number: Book?.pageCount,
              rate: Book?.rating,
              remember: true,
            }}
          >
            <Form.Item
              name="Title"
              label="Title of Book"
              rules={[
                {
                  required: true,
                  message: "Please enter something!",
                },
              ]}
            >
              <Input placeholder="Title of book" />
            </Form.Item>
            <Form.Item
              name="URL"
              label="Image URL"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Enter a valid URL",
                  type: "url",
                },
              ]}
            >
              <Input placeholder="URl of cover image of book" />
            </Form.Item>
            <Form.Item
              name="Author"
              label="Author's name"
              rules={[
                {
                  required: true,
                  message: "Please enter something",
                },
              ]}
            >
              <Input placeholder="Author name" />
            </Form.Item>
            <Form.Item
              name="Publisher"
              label="Publisher's name"
              rules={[
                {
                  required: true,
                  message: "Please enter something",
                },
              ]}
            >
              <Input placeholder="Publisher's name" />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter something",
                },
              ]}
            >
              <Input.TextArea rows={6} placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="Language"
              label="Language"
              rules={[{ required: true, message: "Please enter something" }]}
            >
              <Select
                placeholder="Select a option and change input text above asd"
                allowClear
              >
                <Select.Option value="english">English</Select.Option>
                <Select.Option value="hindi">Hindi</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="number"
              label="Page count"
              rules={[{ required: true, message: "Please enter something" }]}
            >
              <InputNumber placeholder="pagecount" />
            </Form.Item>
            <Form.Item
              name="rate"
              label="Rate"
              rules={[{ required: true, message: "Please enter something" }]}
            >
              <Rate allowHalf allowClear defaultValue={Book.rating} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="book-form-button"
              >
                Submit details
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};

export default BookDetails;
export const getServerSideProps = async (context) => {
  //request will be made during run time
  const res = await api.get(`TotalBooks/${context.params.id}`);
  const Book = await res.data;

  return {
    props: {
      Book,
    },
  };
};
