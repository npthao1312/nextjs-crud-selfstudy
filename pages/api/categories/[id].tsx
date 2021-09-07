import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../lib/firebase-admin';
import { getCategory as getCategoryFb, updateCategory as updateCategoryFb, deleteCategory as deleteCategoryFb } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getCategory(req, res);
      break;
    case 'PUT':
      await updateCategory(req, res);
      break;
    case 'DELETE':
      await deleteCategory(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const getCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await getCategoryFb(req.query.id);
    return res
      .status(200)
      .json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const postData = { ...req.body, userId: user.uid };
    await updateCategoryFb(req.query.id, postData);
    return res
      .status(200)
      .json({ status: true, message: 'Category updated successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deleteCategoryFb(req.query.id);
    return res
      .status(200)
      .json({ status: true, message: 'Category deleted successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
