import axios from 'axios';

export const addPostApi = async (auth, values) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const resp = await axios.post('/api/posts', values, { headers: header });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const updatePostApi = async (auth, postId, values) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const resp = await axios.put(`/api/posts/${postId}`, values, { headers: header });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const deletePostApi = async (auth, postId) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const resp = await axios.delete(`/api/posts/${postId}`, { headers: header });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const addCategoryApi = async (auth, values) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const resp = await axios.post(
      '/api/categories', values, { headers: header }
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
