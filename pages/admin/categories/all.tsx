import React, { useEffect } from 'react';
import { getAllCategories, deleteCategory } from '../../../utils/db';
import Navbar from '../../../components/navbar'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../lib/auth'
import { useRouter } from 'next/router';

const AllCategories = (props) => {
  const category = JSON.parse(props.category);
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !loading) {
      router.push(`/signin?next=/admin/categories/all`);
    }
  }, [auth, loading]);

  const onDelete = async (category) => {
    try {
      const resp = await deleteCategory(category);
      console.log(resp);
      router.push("/admin");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Head>
        <title>Manage Categories</title>
      </Head>
      <Navbar />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} container`}>
        <Table hover responsive bordered>
          <thead>
            <tr>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map(({id, content, createdAt}) => (
              <tr key={id}>
                <td className="w-50">{content}</td>
                <td className=""><Date dateString={createdAt}/></td>
                <td className="w-25">
                  <Link href={`/categories/${id}`}>
                    <a className="btn btn-success mx-1 text-decoration-none">View</a>
                  </Link>
                  <Link href={`/admin/categories/${id}`}>
                    <a className="btn btn-primary mx-1 text-decoration-none">Edit</a>
                  </Link>
                  <Button className="btn btn-danger mx-1 text-decoration-none" onClick={() => onDelete(id)}>
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
  const category = await getAllCategories();
  const data = category.map((singleCategory: any) => {
    return { ...singleCategory};
  });
  return { props: { category: JSON.stringify(data) } };
}

export default AllCategories;
