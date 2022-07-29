import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Button,
  Col,
  Row,
  Typography,
  Form,
  Input,
  DatePicker,
  Rate,
  Select,
  InputNumber,
  message,
  notification,
} from "antd";
import { Option } from "antd/lib/mentions";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Cover from "../../assets/cover.jpeg";
import "../../styles/addPage.module.css";
import api from "../api/axios/api";

const AddBook = () => {
  const router = useRouter();

  //for validation of date
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const openNotificationWithIcon = (type, text) => {
    notification[type]({
      message: type.toLocaleUpperCase(),
      description: text,
    });
  };

  //This function will add the book to the local database.
  const onFinish = async (values) => {
    const finalData = {
      title: values.Title,
      authors: [values.Author],
      publisher: values.Publisher,
      publishedDate: convertDate(values.datepicker._d),
      pageCount: values.number,
      thumbnail: values.URl,
      description: values.Description,
      language: values.Language,
      rating: values.rate,
    };
    try {
      const response = await api.post("TotalBooks", finalData);
      const res = response.data;
      if (res) {
        openNotificationWithIcon(
          "success",
          "Book added Successfully to Database"
        );
        router.push("/");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something went wrong!");
      console.log("error", error);
    }
  };

  //Add book failed part
  const onFinishFailed = (errorInfo) => {
    message.error("Please provide valid information!");
    console.log("Failed:", errorInfo);
  };

  //function to convert date to required format
  function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  return (
    <>
      <div className="AddPageOuter">
        <Row justify="space-around" align="top">
          <Col xs={24} md={12} order="1">
            <Image src={Cover} alt="" layout="responsive" />
          </Col>
          <Col xs={24} md={11}>
            <Typography.Title level={3}>
              Collections: Add a Book
            </Typography.Title>
            <Row style={{ margin: "30px 0px " }}>
              <Col xs={24} md={20}>
                <Form
                  name="bookform"
                  className="addbook-form"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  initialValues={{ remember: true }}
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
                    name="URl"
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
                    name="datepicker"
                    label="Published Date"
                    {...config}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name="Language"
                    label="Language"
                    rules={[
                      { required: true, message: "Please enter something" },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      // onChange={this.onGenderChange}
                      allowClear
                    >
                      <Option value="english">English</Option>
                      <Option value="hindi">Hindi</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="number"
                    label="Page count"
                    rules={[
                      { required: true, message: "Please enter something" },
                    ]}
                  >
                    <InputNumber placeholder="pagecount" />
                  </Form.Item>
                  <Form.Item
                    name="rate"
                    label="Rate"
                    rules={[
                      { required: true, message: "Please enter something" },
                    ]}
                  >
                    <Rate allowHalf allowClear />
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
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
//To authorize the page if the user is logged in.
export const getServerSideProps = withPageAuthRequired();

export default AddBook;
