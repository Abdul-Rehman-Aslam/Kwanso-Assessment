
import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Box, Container } from '@mui/material';

import { User } from '../types/users';
import UsersListTable from '../components/UsersListTable';
import { fetchUsers } from '../services/api';
import Loading from '../components/Loading';

const UsersList: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = useCallback(async () => {
    setLoading(true);
    const response = await fetchUsers();
    setLoading(false);
    setUsers(response?.results);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        minHeight: '100%',
        py: 4,
      }}
    >
      <Container>
        <Box sx={{ position: 'relative' }}>
          <UsersListTable users={users} />
        </Box>
      </Container>
    </Box>
  );
};

export default UsersList;
