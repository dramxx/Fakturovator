// src/components/SectionTitle.jsx
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const SectionTitle = ({
  children,
  variant = 'h1',
  component = 'h1',
  color = '#0066CC',
  underlineColor = '#FF0000',
  fontSize = '3rem',
  underlineWidth = '9%',
  underlineHeight = '14px',
  ...typographyProps
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant={variant}
        component={component}
        sx={{
          fontSize: fontSize,
          fontWeight: 700,
          color: color,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          fontFamily: '"Jost", "Helvetica Neue", Arial, sans-serif',
          ...typographyProps.sx,
        }}
        {...typographyProps}
      >
        {children}
      </Typography>
      <Box
        sx={{
          width: underlineWidth,
          height: underlineHeight,
          backgroundColor: underlineColor,
          mt: '-2px',
        }}
      />
    </Box>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  component: PropTypes.string,
  color: PropTypes.string,
  underlineColor: PropTypes.string,
};

export default SectionTitle;
