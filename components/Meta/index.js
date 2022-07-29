import Head from "next/head";
import { PropTypes } from "prop-types";
import React from "react";

const Meta = ({
  title = "Booksy",
  description = "free books, books to read, free ebooks, audio books, read books for free, read books online, online library",
}) => {
  return (
    <Head>
      <title>
        {title} - {description}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta
        src="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
        rel="stylesheet"
      />
      <meta name="og:title" content={title} />
      <meta
        name="twitter:card"
        content="free books, books to read, free ebooks, audio books, read books for free, read books online, online library"
      />
    </Head>
  );
};
export default Meta;
Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
