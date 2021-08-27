import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getAllPost, getSinglePost } from '../utils/db';
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import React from 'react';
import { useRouter } from 'next/router';

const Home = (props) => {
  const post = JSON.parse(props.post);
  const router = useRouter();

  const generatePostCard = (singlePost) => {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <ul className={utilStyles.list}  key={singlePost.id}>
            <Link href={`/posts/${singlePost.id}`}>
              <a>{singlePost.title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              {singlePost.category}
            </small>
            <br />
            {singlePost.content}
          </ul>
        </section>
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
      <h2 className={utilStyles.headingLg}>Blog</h2>
          {post.map((singlePost) => (
            <div
              key={singlePost.id}
            >
              {generatePostCard(singlePost)}
            </div>
          ))}
    </Layout>
  )
}

export async function getServerSideProps(_context) {
  const post = await getAllPost();
  const data = post.map((singlePost: any) => {
    return { ...singlePost};
  });
  return { props: { post: JSON.stringify(data) } };
}

export default Home;
