import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPostsByCategory } from '../../utils/db';
import Link from 'next/link'
import Date from '../../components/date'
import React from 'react';
import { NextPageContext } from 'next';

const ShowPostsByCategory = (props) => {
  const post = JSON.parse(props.post);

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
        <Link href={`/categories/${singlePost.category}`}>
          <span className="badge rounded-pill bg-secondary"><a>{singlePost.category}</a></span>
        </Link>
      </li>
    )
  }
  return (
    <Layout>
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

export async function getServerSideProps(context: NextPageContext) {
  const postCategory = context.query.category;
  const post = await getPostsByCategory(postCategory);
  const data = post.map((singlePost: any) => {
    return { ...singlePost};
  });
  return { props: { post: JSON.stringify(data) } };
}

export default ShowPostsByCategory;
