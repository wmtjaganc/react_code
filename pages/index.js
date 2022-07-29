import React from "react";
import HomePage from "../components/Home";
import API from "../pages/api/axios/api";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

//Getting data on runtime better for SEO
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await API.get(`TotalBooks`);
  const data = res.data;

  // Pass data to the page via props
  return { props: { data } };
}
