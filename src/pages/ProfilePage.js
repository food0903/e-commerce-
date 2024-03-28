import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

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
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/login');
      });
  }, [navigate]);

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
      {!userData && (
        <p>
          You need to <Link to="/login">login</Link> to view your profile.
        </p>
      )}
    </div>
  );
}

export default ProfilePage;
