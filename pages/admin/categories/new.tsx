import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { addCategoryApi } from '../../../utils/service';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Layout from '../../../components/layout'
import Head from 'next/head'
import { useAuth } from '../../../lib/auth'

const NewCategory = () => {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!auth && !loading) {
      router.push('/signin?next=/admin/categories/new');
    }
  }, [auth, loading]);

  const initialValues = {
    content: '',
  };

  const validationSchema = yup.object().shape({
    content: yup.string().required('Required'),
  });

  const submitHandler = async (values, actions) => {
    try {
      values = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addCategoryApi(auth, values);
      router.push('/admin');
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Layout admin>
      <Head>
        <title>Create Category</title>
      </Head>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field name="content">
                {({ field, form }) => (
                  <div className="form-group mb-3">
                    <label htmlFor="content">Category</label>
                    <input className="form-control" id="content" {...field}/>
                    {form.errors.description}
                  </div>
                )}
              </Field>
              <div className="d-flex justify-content-center">
                <Button type="submit">
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

export default NewCategory;
