import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPosts, getPost } from '../utils/db';
import Link from 'next/link'
import Date from '../components/date'
import React from 'react';
import { useRouter } from 'next/router';

const Home = (props) => {
  const post = JSON.parse(props.post);
  const router = useRouter();

  const generatePostCard = (singlePost) => {
    return (
      <li className={utilStyles.listItem} key={singlePost.id}>
        <Link href={`/posts/${singlePost.id}`}>
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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello. I'm Thao. I'm learning NextJS.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
            {post.map((singlePost) => (
              <ul className={utilStyles.list}>
                {generatePostCard(singlePost)}
              </ul>
            ))}
      </section>
    </Layout>
  )
}

export async function getServerSideProps(_context) {
  const post = await getAllPosts();
  const data = post.map((singlePost: any) => {
    return { ...singlePost};
  });
  return { props: { post: JSON.stringify(data) } };
}

export default Home;
