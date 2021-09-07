import firebase from '../lib/firebase';

export const addUser = async (authUser: any) => {
  const resp = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });
  return resp;
};

export const getAllPosts = async () => {
  const snapshot = await firebase.firestore().collection('posts').orderBy('createdAt', 'desc').get();
  const post = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return post;
};

export const getPost = async (postId) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .doc(String(postId))
    .get();
  const postData = snapshot.exists ? JSON.stringify(snapshot.data()) : null;
  return postData;
};

export const getPostsByCategory = async (category) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .where('category', '==', category)
    .get();
  const post = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return post;
};

export const addPost = async (postData) => {
  let response = await firebase.firestore().collection('posts').add(postData);
  return response;
};

export const deletePost = async (postId) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .doc(String(postId))
    .delete();
  return postId;
};

export const updatePost = async (postId, updatedPost) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .doc(String(postId))
    .update(updatedPost);
  return updatedPost;
};

export const addCategory = async (id, data) => {
  const response = await firebase.firestore().collection('categories').doc(String(id)).set(data);
  return response;
};

export const getAllCategories = async () => {
  const snapshot = await firebase.firestore().collection('categories').orderBy('createdAt', 'desc').get();
  const category = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return category;
};

export const deleteCategory = async (categoryId) => {
  const snapshot = await firebase
    .firestore()
    .collection('categories')
    .doc(String(categoryId))
    .delete();
  return categoryId;
};

export const getCategory = async (categoryId) => {
  const snapshot = await firebase
    .firestore()
    .collection('categories')
    .doc(String(categoryId))
    .get();
  const categoryData = snapshot.exists ? JSON.stringify(snapshot.data()) : null;
  return categoryData;
};

export const updateCategory = async (categoryId, updatedCategory) => {
  const snapshot = await firebase
    .firestore()
    .collection('categories')
    .doc(String(categoryId))
    .update(updatedCategory);
  return updatedCategory;
};
