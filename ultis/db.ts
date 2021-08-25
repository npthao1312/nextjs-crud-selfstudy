import firebase from '../lib/firebase';

export const getAllPost = async () => {
  const snapshot = await firebase.firestore().collection('post').get();
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
