import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Navbar from '../components/navbar';
import { useAuth } from '../lib/auth';
import Button from 'react-bootstrap/Button'
import Head from 'next/head'

const signin = () => {
  const { auth, siginWithGoogle } = useAuth();
  const router = useRouter();

  if (auth) {
    router.push((router.query.next as string) || '/');
  }

  return (
    <>
      <Navbar />
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="py-5 d-flex justify-content-center">
        <Button variant="light" onClick={() => siginWithGoogle()}>
          <FcGoogle /> Sign In with Google
        </Button>
      </div>
    </>
  );
};

export default signin;
