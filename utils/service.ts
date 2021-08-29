import axios from 'axios';

export const addPostApi = async (values) => {
  try {
    const resp = await axios.post('/api/posts', values);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const editPostApi = async (postId, values) => {
  try {
    const resp = await axios.put(`/api/posts/${postId}`, values);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const deletePostApi = async (postId) => {
  try {
    const resp = await axios.delete(`/api/posts/${postId}`);
    return resp;
  } catch (error) {
    throw error;
  }
};

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
