import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PriceHeader({ price, delta }) {
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedDelta =
    (delta >= 0 ? '+' : '') +
    delta.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const percent = ((delta / (price - delta)) * 100).toFixed(2);
  const isPositive = delta >= 0;

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="flex-start" gap={1}>
        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1}
        >
          ${formattedPrice}
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ transform: 'translateY(6px)', fontWeight: 400 }}
        >
          USD
        </Typography>
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight={500}
        color={isPositive ? 'success.main' : 'error.main'}
      >
        {formattedDelta} ({isPositive ? '+' : ''}{percent}%)
      </Typography>
    </Box>
  );
}
