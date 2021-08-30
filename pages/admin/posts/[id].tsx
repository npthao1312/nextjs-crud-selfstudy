import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getPost, updatePost, deletePost } from '../../../utils/db';
import { editPostApi } from '../../../utils/service';
import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import { Field, Form, Formik } from 'formik';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const EditPost = (post, onEdit, onDelete) => {
  const router = useRouter();

  const initialValues = {
    title: post.title,
    content: post.content,
    category: post.category,
  };

  return (
    <Layout>
      <Head>
        <title>Edit {post.title}</title>
      </Head>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={onEdit}
        >
          {(props) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="title">Post Title</label>
                <Field id="title" name="title" placeholder={post.title} className="form-control">
                </Field>
              </div>
              <Field name="content">
                {({ field, form }) => (
                  <div className="form-group mb-3">
                    <label htmlFor="content">Post Content</label>
                    <textarea class="form-control" id="content" {...field} placeholder={post.content} rows="5" />
                    {form.errors.description}
                  </div>
                )}
              </Field>
              <div className="form-group mb-3">
                <label htmlFor="category">Post Category</label>
                <Field id="category" name="category" placeholder={post.category} className="form-control">
                </Field>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Button type="submit">
                  Edit Post
                </Button>
                <Button className="ms-3" type="button" onClick={onDelete}  variant="danger">
                  Delete Post
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

const EditDeletePost = (props) => {
  const router = useRouter();
  const post = JSON.parse(props.post);

  const onEdit = async (values, actions) => {
    try {
      values = {
        ...values,
        updatedAt: new Date(),
      };
      const resp = await updatePost(props.postId, values);
      console.log(resp);
      router.push("/");
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const onDelete = async () => {
    try {
      const resp = await deletePost(props.postId);
      console.log(resp);
      router.push("/");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {post && EditPost(post, onEdit, onDelete)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query.id;
  const post = await getPost(postId);
  return { props: { post: post, postId } };
}

export default EditDeletePost;
