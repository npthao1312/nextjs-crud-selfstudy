import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getPost, getAllCategories} from '../../../utils/db';
import { updatePostApi, deletePostApi } from '../../../utils/service';
import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import { Field, Form, Formik } from 'formik';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from '../../../lib/auth'

const EditPost = (post, categories, onUpdate, onDelete) => {
  const router = useRouter();

  const initialValues = {
    title: post.title,
    content: post.content,
    category: post.category,
  };

  return (
    <Layout admin>
      <Head>
        <title>Update {post.title}</title>
      </Head>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={onUpdate}
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
                    <textarea className="form-control" id="content" {...field} placeholder={post.content} rows="5" />
                    {form.errors.description}
                  </div>
                )}
              </Field>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="category">Category</label>
                <Field name="category" as="select" className="form-select" id="category">
                  {categories.map(({id, content}) => (
                      <option key={id} value={id}>{content}</option>
                  ))}
                </Field>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Button type="submit" isLoading={props.isSubmitting}>
                  Update
                </Button>
                <Button className="ms-3" type="button" onClick={onDelete} variant="danger">
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

const EditDeletePost = (props) => {
  const { auth, loading } = useAuth();
  const router = useRouter();
  const post = JSON.parse(props.post);
  const categories = JSON.parse(props.category);

  useEffect(() => {
  if (!auth && !loading) {
    router.push(`/signin?next=/admin/posts/${props.postId}`);
    }
  }, [auth, loading]);

  const onUpdate = async (values, actions) => {
    try {
      values = {
        ...values,
        updatedAt: new Date(),
      };
      const resp = await updatePostApi(auth, props.postId, values);
      router.push("/");
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const onDelete = async () => {
    try {
      const resp = await deletePostApi(auth, props.postId);
      router.push("/");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {post && EditPost(post, categories, onUpdate, onDelete)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query.id;
  const [post, category] = await Promise.all([
    getPost(postId),
    getAllCategories()
  ])
  const data = category.map((singleCategory: any) => {
    return { ...singleCategory};
  });
  console.log(category);

  return { props: { category: JSON.stringify(data), post: post, postId } };
}

export default EditDeletePost;
