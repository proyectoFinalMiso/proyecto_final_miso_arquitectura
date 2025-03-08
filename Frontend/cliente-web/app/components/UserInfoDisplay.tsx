import React from 'react';

interface UserInfoDisplayProps {
  userData: any;
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ userData }) => {
  if (!userData)
    return (
      <p className="text-gray-500 text-center mt-4">No user data available</p>
    );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        User Information
      </h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">UID:</span>
          <span className="text-gray-600">{userData.uid}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span className="text-gray-600">{userData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email Verified:</span>
          <span
            className={`px-2 py-1 text-xs rounded ${
              userData.emailVerified
                ? 'bg-green-200 text-green-700'
                : 'bg-red-200 text-red-700'
            }`}
          >
            {userData.emailVerified ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Anonymous:</span>
          <span
            className={`px-2 py-1 text-xs rounded ${
              userData.isAnonymous
                ? 'bg-yellow-200 text-yellow-700'
                : 'bg-blue-200 text-blue-700'
            }`}
          >
            {userData.isAnonymous ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      {userData.stsTokenManager && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Tokens</h3>
          <div className="space-y-2 text-gray-600">
            <div className="truncate">
              <span className="font-medium">Access Token:</span>{' '}
              {userData.stsTokenManager.accessToken.substring(0, 30)}...
            </div>
            <div className="truncate">
              <span className="font-medium">Refresh Token:</span>{' '}
              {userData.stsTokenManager.refreshToken.substring(0, 30)}...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoDisplay;
