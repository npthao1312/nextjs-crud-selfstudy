import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getSinglePost } from '../../../utils/db';

const ShowPost = (post) => {
  return (
    <div>
        {post.title}
        {post.content}
        {post.category}
    </div>
  );
};

const SinglePost = (props) => {
  const router = useRouter();
  const post = JSON.parse(props.post);
  return (
    <>
      {post && ShowPost(post)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query.id;
  const postData = await getSinglePost(postId);
  return { props: { post: postData, postId } };
}

export default SinglePost;
