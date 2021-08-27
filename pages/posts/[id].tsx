import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getSinglePost } from '../../utils/db';
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

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
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className={utilStyles.lightText}>
          {post.category}
        </div>
      </article>
    </Layout>
  );
};

const SinglePost = (props) => {
  const router = useRouter();
  const post = JSON.parse(props.post);
  return (
    <>
      {post && ShowPost(post)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query.id;
  const post = await getSinglePost(postId);
  return { props: { post: post, postId } };
}

export default SinglePost;
