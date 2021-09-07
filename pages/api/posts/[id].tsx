import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../lib/firebase-admin';
import { getPost as getPostFb, updatePost as updatePostFb, deletePost as deletePostFb } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getPost(req, res);
      break;
    case 'PUT':
      await updatePost(req, res);
      break;
    case 'DELETE':
      await deletePost(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await getPostFb(req.query.id);
    return res
      .status(200)
      .json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const postData = { ...req.body, userId: user.uid };
    await updatePostFb(req.query.id, postData);
    return res
      .status(200)
      .json({ status: true, message: 'Post updated successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deletePostFb(req.query.id);
    return res
      .status(200)
      .json({ status: true, message: 'Post deleted successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
