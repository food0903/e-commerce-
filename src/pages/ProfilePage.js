import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch user data
    const token = localStorage.getItem('token'); 
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      return res.json();
    })
    .then(data => {
      setUserData(data); // Set user data to state
    })
  }, []); 

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Gender: {userData.gender}</p>
          <img src={userData.image} alt="User" />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
