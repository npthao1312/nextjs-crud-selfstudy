import { NextApiRequest, NextApiResponse } from 'next';
import { addPost as addPostFb, getAllPosts } from '../../../utils/db';
import { auth } from '../../../lib/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getPosts(req, res);
      break;
    case 'POST':
      await addPost(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await getAllPosts();
    return res
      .status(200)
      .json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const addPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const postData = { ...req.body, userId: user.uid };
    await addPostFb(postData);
    return res
      .status(200)
      .json({ status: true, message: 'Post added successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
