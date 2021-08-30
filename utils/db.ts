import firebase from '../lib/firebase';

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
  const postData = snapshot.exists ? JSON.stringify(snapshot.data()) : null;
  return postData;
};

export const updatePost = async (postId, updatedPost) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .doc(String(postId))
    .update(updatedPost);
  const postData = snapshot.exists ? JSON.stringify(snapshot.data()) : null;
  return postData;
};

export const addCategory = async (data) => {
  const response = await firebase.firestore().collection('categories').add(data);
  return response;
};
