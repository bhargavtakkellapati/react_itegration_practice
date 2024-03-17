import React, { useState } from 'react';

const Registration = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    interests: [],
    subscribeNewsletter: false,
    country: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = [...users];

    if (editIndex !== null) {
      updatedUsers[editIndex] = userData;
      setEditIndex(null);
    } else {
      updatedUsers.push(userData);
    }

    setUsers(updatedUsers);

    setUserData({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      interests: [],
      subscribeNewsletter: false,
      country: '',
    });
  };

  const handleInterestsChange = (event) => {
    const { value, checked } = event.target;
    const newInterests = checked
      ? [...userData.interests, value]
      : userData.interests.filter((interest) => interest !== value);

    setUserData({ ...userData, interests: newInterests });
  };

  const handleSwitchChange = (event) => {
    const { checked } = event.target;
    setUserData({ ...userData, subscribeNewsletter: checked });
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleEdit = (index) => {
    setUserData(users[index]);
    setEditIndex(index);
  };

  return (
    <React.Fragment>
      <div className="registration_container">
        <h2 id="registration">User Registration</h2>
        <form className="form_container" onSubmit={handleSubmit}>
          <div className="form_group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={(event) =>
                setUserData({ ...userData, firstName: event.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={(event) =>
                setUserData({ ...userData, lastName: event.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={(event) =>
                setUserData({ ...userData, dob: event.target.value })
              }
            />
          </div>
          <div className="form_group">
            <h3>Gender:</h3>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={userData.gender === 'male'}
                onChange={(event) =>
                  setUserData({ ...userData, gender: event.target.value })
                }
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={userData.gender === 'female'}
                onChange={(event) =>
                  setUserData({ ...userData, gender: event.target.value })
                }
              />
              Female
            </label>
          </div>
          <div className="form_group">
            <h3>Interests:</h3>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Sports"
                checked={userData.interests.includes('Sports')}
                onChange={handleInterestsChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Music"
                checked={userData.interests.includes('Music')}
                onChange={handleInterestsChange}
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Reading"
                checked={userData.interests.includes('Reading')}
                onChange={handleInterestsChange}
              />
              Reading
            </label>
          </div>
          <div className="form_group">
            <h3>Subscribe to Newsletter:</h3>
            <label>
              <input
                type="checkbox"
                name="subscribeNewsletter"
                checked={userData.subscribeNewsletter}
                onChange={handleSwitchChange}
              />
              Yes
            </label>
          </div>
          <div className="form_group">
            <h3>Country:</h3>
            <select
              name="country"
              value={userData.country}
              onChange={(event) =>
                setUserData({ ...userData, country: event.target.value })
              }
            >
              <option value="">Select Country</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
            </select>
          </div>
          <div>
            <button className="button" type="submit" >
            
            {editIndex !== null ? 'update':"submit"}
            </button>
          </div>
        </form>
      </div>

      <h1>User Listings</h1>
      <div className="user_list">
        <h2>User Listings</h2>
        <table className="user_table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Interests</th>
              <th>Subscribe to Newsletter</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.interests.join(', ')}</td>
                <td>{user.subscribeNewsletter ? 'Yes' : 'No'}</td>
                <td>{user.country}</td>
                <td>
                  <button id="edit_btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Registration;
