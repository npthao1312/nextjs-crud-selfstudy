import { NextPageContext } from 'next';
import React, { useEffect } from 'react';
import { getPost } from '../../utils/db';
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import ReactMarkdown from "react-markdown";
import Link from 'next/link'

const ShowPost = (post) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.createdAt} />
        </div>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <Link href={`/categories/${post.category}`}>
          <span className="badge rounded-pill bg-secondary my-2"><a>{post.category}</a></span>
        </Link>
      </article>
    </Layout>
  );
};

const SinglePost = (props) => {
  const post = JSON.parse(props.post);
  return (
    <>
      {post && ShowPost(post)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query.id;
  const post = await getPost(postId);
  return { props: { post: post, postId } };
}

export default SinglePost;
