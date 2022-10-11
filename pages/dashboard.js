import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Message from '../components/Message';

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push('/auth/login');
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where('user', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <Layout>
      <h1>Your posts</h1>
      {posts.map((post) => (
        <Message key={post.id} {...post}></Message>
      ))}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </Layout>
  );
}
