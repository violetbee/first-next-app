import Layout from '../components/Layout';
import Message from '../components/Message';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Home() {
  //Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);
  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout>
      <div className='my-12 text-lg font-medium'>
        <h2 className='text-2xl'>See what other people are saying</h2>
      </div>
      {allPosts.map((post) => (
        <Message {...post} key={post.id}></Message>
      ))}
    </Layout>
  );
}
