import { NextApiRequest, NextApiResponse } from 'next';
import { addCategory as addCategoryFb } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await addCategory(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
};

const addCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categoryData = { ...req.body };
    await addCategoryFb(categoryData);
    return res
      .status(200)
      .json({ status: true, message: 'Category added successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' });
  }
};
