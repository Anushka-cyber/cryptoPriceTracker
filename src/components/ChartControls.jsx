import React from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';

const timeframes = ['1d', '3d', '1w', '1m', '6m', '1y', 'max'];

const ChartControls = ({ timeframe, onTimeframeChange }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            p={1.5}
            borderRadius={2}
            bgcolor="#fff"
        >
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton size="small">
                    <FullscreenIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle2" fontWeight={500} style={{ color: "#6F7177"}}>
                    Fullscreen
                </Typography>
                <IconButton size="small">
                    <AddIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle2" fontWeight={500} style={{ color: "#6F7177"}}>
                    Compare
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
            {timeframes.map((tf, index) => (
  <Button
    key={tf}
    variant="text"
    size="small"
    onClick={() => onTimeframeChange?.(tf)}
    sx={{
      ml: index !== 0 ? 1 : 0,
      borderRadius: '12px',
      textTransform: 'none',
      fontSize: '13px',
      padding: '4px 12px',
      minWidth: 'auto',
      backgroundColor: tf === timeframe ? '#4B40EE' : 'transparent',
      color: tf === timeframe ? '#fff' : '#333',
      '&:hover': {
        backgroundColor: tf === timeframe ? '#4B40EE' : '#f0f0f0',
      },
      boxShadow: 'none',
      border: 'none',
    }}
  >
    {tf}
  </Button>
))}

            </Box>
        </Box>
    );
};

export default ChartControls;
