import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { addPostApi } from '../../../utils/service';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Index = () => {
  const router = useRouter();

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
      await addPostApi(values);
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <label htmlFor="title">Post Title</label>
              <Field id="title" name="title" placeholder="Title">
              </Field>
              <label htmlFor="content">Post Content</label>
              <Field id="content" name="content" placeholder="Content">
              </Field>
              <label htmlFor="category">Post Category</label>
              <Field id="category" name="category" placeholder="Category">
              </Field>
              <Button type="submit">
                Submit Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Index;
