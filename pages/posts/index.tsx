import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import Heading from "../../components/Heading";
import { postType } from "../../types";

type postTypeProps = {
  posts: [postType],
}

export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts: data.slice(0, 20) },
  };
};

const Posts:FC<postTypeProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Heading text="Posts list:" />
      <ul>
        {posts &&
          posts.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Posts;
