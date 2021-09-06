import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { addPostApi } from '../../../utils/service';
import { getAllCategories } from '../../../utils/db';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Layout from '../../../components/layout'
import Head from 'next/head'
import { useAuth } from '../../../lib/auth'

const NewPost = (props) => {
  const category = JSON.parse(props.category);
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !loading) {
      router.push('/signin?next=/admin/posts/new');
    }
  }, [auth, loading]);

  const initialValues = {
    title: '',
    content: '',
    category: '',
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    content: yup.string().required('Required'),
    category: yup.string().required('Required'),
  });

  const submitHandler = async (values, actions) => {
    try {
      values = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addPostApi(auth, values);
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Layout admin>
      <Head>
        <title>Create Post</title>
      </Head>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="title">Post Title</label>
                <Field id="title" name="title" placeholder="Title" className="form-control">
                </Field>
              </div>
              <Field name="content">
                {({ field, form }) => (
                  <div className="form-group mb-3">
                    <label htmlFor="content">Post Content</label>
                    <textarea className="form-control" id="content" placeholder="We do support markdown, try it" {...field} rows="5"/>
                    {form.errors.description}
                  </div>
                )}
              </Field>
              <Field name="category">
                {({ field }) => (
                  <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="category">Category</label>
                    <select className="form-select" id="category">
                      {category.map(({id, content}) => (
                          <option key={id} value={content} {...field}>{content}</option>
                      ))}
                    </select>
                  </div>
                )}
              </Field>
              <div className="d-flex justify-content-center">
              <Button
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(_context) {
  const category = await getAllCategories();
  const data = category.map((singleCategory: any) => {
    return { ...singleCategory};
  });
  return { props: { category: JSON.stringify(data) } };
}

export default NewPost;
