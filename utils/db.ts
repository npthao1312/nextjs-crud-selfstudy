import firebase from '../lib/firebase';

export const getAllPost = async () => {
  const snapshot = await firebase.firestore().collection('posts').get();
  const post = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return post;
};

export const getSinglePost = async (postId) => {
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .doc(String(postId))
    .get();
  const postData = snapshot.exists ? JSON.stringify(snapshot.data()) : null;
  return postData;
};

export const addPost = async (postData) => {
  let response = await firebase.firestore().collection('posts').add(postData);
  return response;
};

export const addCategory = async (data) => {
  const response = await firebase.firestore().collection('categories').add(data);
  return response;
};
