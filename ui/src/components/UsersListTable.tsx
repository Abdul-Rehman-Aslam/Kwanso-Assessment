import { ChangeEvent, FC, useEffect, useState, MouseEvent } from 'react';
import { Avatar, Box, Card, Checkbox, InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { User } from '../types/users';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  users: User[];
}

const styles = {
  topBarButton: {
    height: '42px',
    mt: -0.3,
    backgroundColor: '#FFFF',
    color: '#425466',
    border: `1px solid #EDF1F6`,
    '&:hover': {
      backgroundColor: '#FFFF',
      color: '#FFFF',
    },
  },
  dropDown: {
    display: 'flex',
    borderRadius: '6px',
    border: '1px solid #EDF1F6',
    alignItems: 'center',
    paddingLeft: '8px',
    height: '42px',
    width: '250px',
    backgroundColor: '#FFFF',
  },
  topBarDropdown: {
    color: '#425466',
    '& .MuiSelect-select': {
      padding: '5px 14px 5px 5px',
    },
    '& .MuiNativeSelect-select': {
      padding: '0 14px',
      backgroundColor: '#FFFF',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  topBarSearch: {
    backgroundColor: '#FFFF',
    '& .MuiInputBase-input': {
      paddingLeft: '8px',
      backgroundColor: '#FFFF',
    },
    '& .MuiOutlinedInput-root': {
      height: '42px',
      borderRadius: '6px',
      border: '1px solid #EFEFF0',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  head: {
    color: '#193660',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
  },
  filters: {
    alignItems: 'end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'end',
    gap: '8px',
    mb: 2,
    '@media (max-width: 1515px)': {
      justifyContent: 'end',
    },
    '@media (max-width: 768px)': {
      mb: 0,
      justifyContent: 'flex-start',
    },
  },
};

const UsersListTable: FC<TableProps> = ({ users }) => {
  const [orderedUsers, setOrderedUsers] = useState<User[]>();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();

  const selectedSomeUsers = selectedUsers?.length > 0 && selectedUsers?.length < users?.length;
  const selectedAllUsers = selectedUsers?.length === users?.length;

  const [filters, setFilters] = useState<any>({
    gender: localStorage.getItem('gender') || '',
  });

  const handleSelectAllCourts = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users?.map((item) => item?.id?.value) : []);
  };

  const handleSelectOneUser = (event: ChangeEvent<HTMLInputElement>, userId: string): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  useEffect(() => {
    setOrderedUsers(users);
  }, [users]);

  const handleNavigate = (uuid: string) => {
    navigate(`/user/${uuid}`);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
    setQuery('');
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value, 10);

    if (newLimit === -1) {
      setLimit(orderedUsers?.length || 0);
    } else {
      setLimit(newLimit);
    }
    setPage(0);
    setQuery('');
  };

  const applyFilters = (usersArray: User[], query: string, filters: any): User[] =>
    usersArray?.filter((user) => {
      let matches = true;

      if (query) {
        const searchWords = query.toLowerCase().split(' ');
        const properties = ['title', 'first', 'last', 'email'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (searchWords?.every((word) => user?.name[property]?.toLowerCase()?.includes(word)) || searchWords?.every((word) => user?.email?.toLowerCase()?.includes(word))) {
            containsQuery = true;
          }
        });
        if (!containsQuery) {
          matches = false;
        }
      }

      Object.keys(filters).forEach((key) => {
        const value = filters[key];

        if (value && user[key as keyof User] !== value) {
          matches = false;
        }
      });

      return matches;
    });

  const filteredEntries = applyFilters(users, query, filters);
  const applyPagination = (users: User[], page: number, limit: number): User[] => users?.slice(page * limit, page * limit + limit);
  const paginatedEntries = applyPagination(filteredEntries, page, limit);

  return (
    <Box>
      <Box sx={styles.filters}>
        <Box
          sx={{
            maxWidth: '100%',
            width: '200px',
          }}
        >
          <TextField
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: '#19366066' }} />
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search"
            value={query}
            variant="outlined"
            sx={styles.topBarSearch}
          />
        </Box>
        <Box sx={styles.dropDown}>
          <Typography sx={{ color: '#19366066' }}>Gender: </Typography>
          <TextField
            fullWidth
            name="category"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            sx={styles.topBarDropdown}
            onChange={(e) => {
              setFilters({ gender: e.target.value });
              localStorage.setItem('gender', e.target.value);
            }}
            value={filters.gender}
          >
            <option value="">Anyone</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </TextField>
        </Box>
      </Box>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '0px',
        }}
      >
        <Box sx={{ minWidth: 700, position: 'relative', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 0, py: 1.5, pl: 0.5 }}>
                  <Checkbox checked={selectedAllUsers} sx={{ color: '#D3D3D3' }} indeterminate={selectedSomeUsers} onChange={handleSelectAllCourts} />
                </TableCell>
                <TableCell sx={styles.head}>Name</TableCell>
                <TableCell sx={styles.head}>Gender</TableCell>
                <TableCell sx={styles.head}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ width: '100%' }}>
              {paginatedEntries?.map((user, index) => {
                const isUsersSelected = selectedUsers.includes(user?.id?.value);

                return (
                  <TableRow hover key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isUsersSelected} sx={{ color: '#D3D3D3' }} onChange={(event) => handleSelectOneUser(event, user?.id?.value)} value={isUsersSelected} />
                    </TableCell>
                    <TableCell sx={{ minWidth: '200px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            cursor: 'pointer',
                            alignItems: 'center',
                            '&:hover': { color: '#29ABE2' },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: '30px',
                              height: '30px',
                              mr: 1,
                            }}
                            src={user?.picture?.medium}
                          />
                          <Typography
                            onClick={() => handleNavigate(user?.login?.uuid)}
                            sx={{
                              display: 'flex',
                              width: '-webkit-fill-available',
                              color: '#193660',
                              fontWeight: '500',
                              '&:hover': { color: '#29ABE2' },
                              mr: 0.5,
                            }}
                          >
                            {`${user?.name?.first} ${user?.name?.last}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ minWidth: '100px' }}>{user?.gender}</TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>{user?.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={filteredEntries?.length || 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Card>
    </Box>
  );
};

export default UsersListTable;
