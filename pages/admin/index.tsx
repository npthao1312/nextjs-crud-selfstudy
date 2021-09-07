import React, { useEffect } from 'react';
import { getAllPosts } from '../../utils/db';
import { deletePostApi } from '../../utils/service';
import Navbar from '../../components/navbar'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../components/date'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../lib/auth'
import { useRouter } from 'next/router';

const AllPosts = (props) => {
  const post = JSON.parse(props.post);
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !loading) {
      router.push(`/signin?next=/admin`);
    }
  }, [auth, loading]);

  const onDelete = async (postId) => {
    try {
      const resp = await deletePostApi(auth, postId);
      router.push("/admin");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Head>
        <title>Manage Posts</title>
      </Head>
      <Navbar />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} container`}>
        <div className="container my-4">
          <div className="row">
            <div className="col-lg-3">
              <Link href={"/admin/posts/new"}>
                <a className="btn btn-success mx-1 text-decoration-none">New Post</a>
              </Link>
            </div>
            <div className="col-lg-7">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
        <Table hover responsive bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {post.map(({id, title, category, createdAt}) => (
              <tr key={id}>
                <td className="w-50">{title}</td>
                <td className="">{category}</td>
                <td className=""><Date dateString={createdAt}/></td>
                <td className="w-25">
                  <Link href={`/posts/${id}`}>
                    <a className="btn btn-success mx-1 text-decoration-none">View</a>
                  </Link>
                  <Link href={`/admin/posts/${id}`}>
                    <a className="btn btn-primary mx-1 text-decoration-none">Edit</a>
                  </Link>
                  <Button className="btn btn-danger mx-1 text-decoration-none" onClick={() => onDelete(id)} >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
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
