import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const navOptions = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'];

export default function NavTabs({ active, onChange }) {
  const handleChange = (_event, value) => {
    onChange && onChange(value);
  };

  return (
    <Box mb={2} borderBottom={1} borderColor="divider">
      <Tabs
        value={active}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {navOptions.map((opt) => (
          <Tab
            key={opt}
            label={opt}
            value={opt}
            sx={{ textTransform: 'none', fontWeight: 500, fontSize: '14px' }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
