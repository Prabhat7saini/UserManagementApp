import React from 'react';
import { Box, Button } from '@mui/material';


interface ButtonCProps {
  text: string;
  onClick?: () => void; 
}

const ButtonC: React.FC<ButtonCProps> = ({ text, onClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      <Button variant="contained" color="primary" onClick={onClick}>
        {text}
      </Button>
    </Box>
  );
};

export default ButtonC;
