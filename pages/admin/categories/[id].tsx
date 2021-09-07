import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCategory } from '../../../utils/db';
import { getCategoryApi, updateCategoryApi, deleteCategoryApi } from '../../../utils/service';
import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import { Field, Form, Formik } from 'formik';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from '../../../lib/auth'

const EditCategory = (category, onUpdate, onDelete) => {
  const router = useRouter();

  const initialValues = {
    content: category.content
  };

  return (
    <Layout admin>
      <Head>
        <title>Update {category.content}</title>
      </Head>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={onUpdate}
        >
          {(props) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="content">Category</label>
                <Field id="content" name="content" placeholder={category.content} className="form-control">
                </Field>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Button type="submit" isLoading={props.isSubmitting}>
                  Update
                </Button>
                <Button className="ms-3" type="button" onClick={onDelete}  variant="danger">
                  Delete
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

const EditDeleteCategory = (props) => {
  const { auth, loading } = useAuth();
  const router = useRouter();
  const category = JSON.parse(props.category);

  useEffect(() => {
  if (!auth && !loading) {
    router.push(`/signin?next=/admin/categorys/${props.categoryId}`);
    }
  }, [auth, loading]);

  const onUpdate = async (values, actions) => {
    try {
      values = {
        ...values,
        updatedAt: new Date(),
      };
      const resp = await updateCategoryApi(auth, props.categoryId, values);
      console.log(resp);
      router.push("/admin/categories/all");
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const onDelete = async () => {
    try {
      const resp = await deleteCategoryApi(auth, props.categoryId);
      console.log(resp);
      router.push("/admin");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {category && EditCategory(category, onUpdate, onDelete)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const categoryId = context.query.id;
  const category = await getCategory(categoryId);
  return { props: { category: category, categoryId } };
}

export default EditDeleteCategory;
