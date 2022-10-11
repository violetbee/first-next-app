import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: '' });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();

    //Run checks for description
    if (!post.description) {
      toast.error('Description field is empty.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error('Description is longer than 300 characters.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      return;
    }

    //Make a new post
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: '' });
    toast.success('Post is sent successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
    setTimeout(() => {
      route.push('/');
    }, 2500);
  };

  return (
    <Layout>
      <div className='my-20 p-4 shadow-lg rounded-lg max-w-md mx-auto'>
        <form onSubmit={submitPost}>
          <h1 className='text-2xl font-bold'>Create a new post</h1>
          <div className='py-2'>
            <h3 className='text-lg font-medium py-2'>Description</h3>
            <textarea
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              value={post.description}
              className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'
            ></textarea>
            <p
              className={`text-cyan-600 font-medium text-sm ${
                post.description.length > 300 ? 'text-red-600' : ''
              }`}
            >
              {post.description.length}/300
            </p>
          </div>
          <button
            type='submit'
            className='p-2 my-2 w-full bg-cyan-600 font-medium text-sm text-white rounded-lg'
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
