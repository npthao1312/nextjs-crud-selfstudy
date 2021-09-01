import React, { useEffect } from 'react';
import { getAllPosts, deletePost } from '../../../utils/db';
import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const AllPosts = (props) => {
  const post = JSON.parse(props.post);

  const generatePostCard = (singlePost) => {
    return (
        <>
          <td className="w-50">{singlePost.title}</td>
          <td className="">{singlePost.category}</td>
          <td className=""><Date dateString={singlePost.createdAt}/></td>
          <td className="w-25">
            <Link href={`/posts/${singlePost.id}`}>
              <a className="btn btn-success mx-1 text-decoration-none">View</a>
            </Link>
            <Link href={`/admin/posts/${singlePost.id}`}>
              <a className="btn btn-primary mx-1 text-decoration-none">Edit</a>
            </Link>
            <Link href={`/admin/posts/${singlePost.id}`}>
              <a className="btn btn-danger mx-1 text-decoration-none">Delete</a>
            </Link>
          </td>
        </>
    )
  }

  return (
    <div className="container">
      <Head>
        <title>Manage Posts</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div class="container">
          <div class="row">
            <div class="col-3">
              <Link href={"/admin/posts/new"}>
                <a className="btn btn-primary mb-4 text-decoration-none">Add new</a>
              </Link>
            </div>
            <div class="col-9">
              <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="addon-wrapping">Search</span>
                </div>
                <input type="text" class="form-control" aria-label="Post" aria-describedby="addon-wrapping"/>
              </div>
            </div>
          </div>
        </div>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {post.map((singlePost) => (
              <tr>
                {generatePostCard(singlePost)}
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
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
