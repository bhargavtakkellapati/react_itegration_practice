import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Input } from 'antd';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false); // Define state for details modal visibility

  const getUsersList = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setUsers(response.data.users.slice(0, 9));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      setSelectedUser(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const viewUserDetails = async (id) => {
    try {
      await getUserById(id);
      setIsDetailsModalVisible(true); // Show details modal after fetching user details
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleCancelDetailsModal = () => {
    setIsDetailsModalVisible(false); // Close details modal
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${id}`);
      if (response.data) {
        message.success('User deleted successfully!');
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createUser = async (values) => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', values);
      const newUser = response.data;
      message.success('User created successfully!');
      setUsers([...users, newUser]);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (id, values) => {
    try {
      const response = await axios.put(`https://dummyjson.com/users/${id}`, values);
      const updatedUser = response.data;
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      setIsModalVisible(true);
      setSelectedUser(response.data);
      message.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedUser(null);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <React.Fragment>
      <div className="user_list">
        <h2>User Listings</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create User
        </Button>
        <table className="user_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>firstName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>age</th>
              <th>dob</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.age}</td>
                <td>{user.birthDate}</td>
                <td>
                  <button onClick={() => updateUser(user.id)}>edit</button>
                  <button onClick={() => viewUserDetails(user.id)}>view details</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={selectedUser ? 'Edit User' : 'Create User'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm onSubmit={selectedUser ? (values) => updateUser(selectedUser.id, values) : createUser} initialValues={selectedUser} form={form} />
      </Modal>
      <UserDetailsModal visible={isDetailsModalVisible} user={selectedUser} onClose={handleCancelDetailsModal} />
    </React.Fragment>
  );
};

const UserDetailsModal = ({ visible, user, onClose }) => {
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>ID: {user ? user.id : ''}</p>
      <p>Name: {user ? user.firstName : ''}</p>
      <p>Email: {user ? user.email : ''}</p>
      {/* Add more user details as needed */}
    </Modal>
  );
};

const UserForm = ({ onSubmit, initialValues, form }) => {
  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(initialValues); // Set form values when initialValues change
  }, [initialValues, form]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Age" name="age">
        <Input />
      </Form.Item>
      <Form.Item label="DOB" name="birthDate">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Users;
