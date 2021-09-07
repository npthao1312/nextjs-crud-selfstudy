import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../lib/auth';

const Navbar: React.FC<{}> = () => {
  const router = useRouter();
  const { auth, signOut } = useAuth();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <div className="container"> <button className="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar"> <a className="navbar-brand d-none d-md-block text-decoration-none" onClick={() => router.push('/admin')}>
            <b>Admin</b>
          </a>
          <ul className="navbar-nav mx-auto" ></ul>
          { auth ? (
            <ul className="navbar-nav">
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/admin/posts/new')}>New Post</a> </li>
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/admin/categories/all')}>All Categories</a> </li>
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => router.push('/admin/categories/new')}>New Category</a> </li>
              <li className="nav-item"> <a className="nav-link text-white text-decoration-none" onClick={() => signOut()}>Logout</a> </li>
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
