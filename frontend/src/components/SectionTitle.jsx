// src/components/SectionTitle.jsx
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { getColor } from '../theme/colors';

const SectionTitle = ({
  children,
  variant = 'h1',
  component = 'h1',
  color = getColor('text.primary'),
  underlineColor = getColor('primary.red'),
  fontSize = '3rem',
  underlineWidth = '70%',
  underlineHeight = '10px',
  ...typographyProps
}) => {
  // Calculate text length and make underline proportional to font size
  const textLength = children?.toString().length || 10;
  const fontSizeMultiplier = parseFloat(fontSize) || 3; // Default 3rem
  const calculatedWidth = Math.min(
    Math.max(textLength * fontSizeMultiplier * 4, 80),
    400
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant={variant}
        component={component}
        sx={{
          userSelect: 'none',
          fontSize: fontSize,
          fontWeight: 700,
          color: color,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          ...typographyProps.sx,
        }}
        {...typographyProps}
      >
        {children}
      </Typography>
      <Box
        sx={{
          width:
            typeof underlineWidth === 'string' && underlineWidth.includes('%')
              ? calculatedWidth
              : underlineWidth,
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
