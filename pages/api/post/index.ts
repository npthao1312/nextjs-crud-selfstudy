import { NextApiRequest, NextApiResponse } from 'next';
import { addPost as addPostFb } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await addPost(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const addPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postData = { ...req.body };
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
