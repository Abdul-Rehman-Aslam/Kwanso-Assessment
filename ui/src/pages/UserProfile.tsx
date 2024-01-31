import React, { FC, useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import { CalendarMonth, ContactMail, LocalPhone, Lock, PermIdentity, ShareLocation } from '@mui/icons-material';
import { User } from '../types/users';
import { fetchUser } from '../services/api';
import { useParams } from 'react-router-dom';
import TabPanel from '../components/TabsPanel';
import Loading from '../components/Loading';

const UserProfilePage: FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState(0);
  const { uuid } = useParams();

  const getUsers = useCallback(async (uuid: string) => {
    setLoading(true);
    const response = await fetchUser(uuid);
    setLoading(false);
    setUser(response);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUsers(uuid || '');
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px', minHeight: '90vh' }}>
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <Box sx={{ height: '200px', borderBottom: '1px solid #eee', background: '#FAFAFA' }} />
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '4px solid #fff',
              position: 'relative',
              top: -90,
              marginLeft: 'auto',
              marginRight: 'auto',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            }}
            src={user?.picture?.large}
            alt="User Avatar"
          />
          <Typography variant="h6" align="center" style={{ marginTop: '-50px', fontWeight: 'bold', color: '#3d3d3d61' }}>
            Hi, My name is
          </Typography>
          <Typography variant="h5" align="center" sx={{ mt: '10px', fontWeight: 'bold' }}>
            {user?.name?.first} {user?.name?.last}
          </Typography>

          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab icon={<PermIdentity />} />
              <Tab icon={<ContactMail />} />
              <Tab icon={<CalendarMonth />} />
              <Tab icon={<ShareLocation />} />
              <Tab icon={<LocalPhone />} />
              <Tab icon={<Lock />} />
            </Tabs>
          </CardContent>
          <TabPanel value={value} index={0}>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <b>Username:</b> {user?.login?.username}
            </Typography>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <b>Gender:</b> {user?.gender}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <Link href={`mailto:${user?.email}`} sx={{ color: '#3d3d3d', textDecoration: 'none' }}>
                <b>Email:</b> {user?.email}
              </Link>
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <b>Date Of birth:</b> {new Date(user?.dob?.date).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <b>Age:</b> {user?.dob?.age}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box component="iframe" src={`https://www.google.com/maps/@0,0,3z?hl=en-US&entry=ttu`} width="100%" height="450" style={{ border: 0 }} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Typography variant="h6" align="left" sx={{ mt: '10px', fontSize: '16px' }}>
              <b>Phone:</b> {user?.phone}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={5}>
            Profile is locked
          </TabPanel>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
