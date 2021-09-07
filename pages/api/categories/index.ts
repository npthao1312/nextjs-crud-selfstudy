import { NextApiRequest, NextApiResponse } from 'next';
import { addCategory as addCategoryFb, getAllCategories } from '../../../utils/db';
import { auth } from '../../../lib/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getCategories(req, res);
      break;
    case 'POST':
      await addCategory(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await getAllCategories();
    return res
      .status(200)
      .json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const addCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const categoryData = { ...req.body, userId: user.uid };
    const categoryId = req.body.content.toString().toLowerCase();
    await addCategoryFb(categoryId, categoryData);
    return res
      .status(200)
      .json({ status: true, message: 'Category added successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
