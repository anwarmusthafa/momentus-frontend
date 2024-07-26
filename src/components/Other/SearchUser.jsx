// SearchUserComponent.js
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { userAxiosInstance } from '../../services/axiosInstance';
import { Link } from 'react-router-dom';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm) {
        try {
            const response = await userAxiosInstance.get(`/accounts/search-user/?query=${searchTerm}`);
          setFilteredUsers(response.data);
          console.log('Users fetched successfully:', response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      } else {
        setFilteredUsers([]);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredUsers([]);
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', maxWidth: '400px', margin: '2rem auto' }} className='text-center' >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List>
        {filteredUsers.map(user => (
          <ListItem key={user.id} component={Link} to={`/profile/${user.momentus_user_name}`} button>
            <ListItemAvatar>
              <Avatar src={user.profile_picture} />
            </ListItemAvatar>
            <ListItemText primary={user.momentus_user_name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchUser;
