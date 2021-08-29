import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getAllPosts, deletePost } from '../../../utils/db';
import Button from "react-bootstrap/Button";
import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'

const AllPosts = (props) => {
  const post = JSON.parse(props.post);
  const router = useRouter();

  const generatePostCard = (singlePost) => {
    return (
      <li className={utilStyles.listItem} key={singlePost.id}>
        <Link href={`/admin/posts/${singlePost.id}`}>
          <a>{singlePost.title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={singlePost.createdAt} />
        </small>
        <br />
        <p className={utilStyles.lightText}>
          {singlePost.category}
        </p>
      </li>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Manage Posts</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
            {post.map((singlePost) => (
              <ul className={utilStyles.list}>
                {generatePostCard(singlePost)}
              </ul>
            ))}
      </section>
    </Layout>
  );
};


export async function getServerSideProps(_context) {
  const post = await getAllPosts();
  const data = post.map((singlePost: any) => {
    return { ...singlePost};
  });
  return { props: { post: JSON.stringify(data) } };
}

export default AllPosts;
