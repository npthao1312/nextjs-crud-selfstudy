import axios from 'axios';

export const addPostApi = async (values) => {
  try {
    const resp = await axios.post('/api/post', values);
    return resp;
  } catch (error) {
    throw error;
  }
};

// export const deletePostApi = async (values) => {
//   try {
//     const resp = await axios.delete('/api/post', values);
//     return resp;
//   } catch (error) {
//     throw error;
//   }
// };

export const addCategoryApi = async (values) => {
  try {
    const resp = await axios.post(
      `/api/category`,
      {
        content: values,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
