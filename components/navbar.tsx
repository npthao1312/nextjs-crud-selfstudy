import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../lib/auth';

const Navbar: React.FC<{}> = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container"> <button className="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar18">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar18"> <a className="navbar-brand d-none d-md-block"  onClick={() => router.push('/admin/posts/all')}>
            <b>Admin</b>
          </a>
          <ul className="navbar-nav mx-auto" ></ul>
          { auth ? (
            <ul className="navbar-nav">
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/admin/posts/new')}>New Post</a> </li>
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/admin/posts/new')}>New Category</a> </li>
            </ul>
            ) : (
            <ul className="navbar-nav">
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/signin')}>Log in</a> </li>
            </ul>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
