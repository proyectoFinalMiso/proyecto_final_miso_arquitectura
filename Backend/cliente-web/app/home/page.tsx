'use client';

import React from 'react';
import { auth } from '../firebase/config';
import DualFormPage from '../components/DualForm';
import UserInfoDisplay from '../components/UserInfoDisplay';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen w-screen">
      <div className="my-4">
        <UserInfoDisplay userData={auth.currentUser} />
      </div>
      <div>
        <DualFormPage />
      </div>
    </div>
  );
};

export default Home;
