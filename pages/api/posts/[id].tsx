import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../lib/firebase-admin';
import { updatePost as updatePostFb, deletePost as deletePostFb } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
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

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const postData = { ...req.body, userId: user.uid };
    await updatePostFb(req.query, postData);
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
    await deletePostFb(req.query);
    return res
      .status(200)
      .json({ status: true, message: 'Post deleted successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
