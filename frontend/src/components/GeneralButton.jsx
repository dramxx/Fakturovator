import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { getColor } from '../theme/colors';

const GeneralButton = ({
  children,
  underlineColor = getColor('primary.red'),
  underlineWidth = '70%',
  underlineHeight = '8px',
  underlineSpacing = 2,
  underlineMarginTop = '-10px',
  fontSize = '1em',
  ...buttonProps
}) => {
  // Calculate text length and make underline proportional to font size
  const textLength = children?.toString().length || 10;
  const fontSizeMultiplier = parseFloat(fontSize) || 1; // Default 1em
  const calculatedWidth = Math.min(
    Math.max(textLength * fontSizeMultiplier * 6, 40),
    200
  );

  return (
    <Box sx={{ display: 'block' }}>
      <Button
        sx={{
          textTransform: 'none',
          fontWeight: 900,
          fontSize: fontSize,
          mb: underlineSpacing,
          outline: `2px solid ${getColor('primary.blue')}`,
          outlineOffset: '2px',
          ...buttonProps.sx,
        }}
        {...buttonProps}
      >
        {children}
      </Button>
      <Box
        sx={{
          width:
            typeof underlineWidth === 'string' && underlineWidth.includes('%')
              ? calculatedWidth
              : underlineWidth,
          height: underlineHeight,
          backgroundColor: underlineColor,
          marginTop: underlineMarginTop,
        }}
      />
    </Box>
  );
};

GeneralButton.propTypes = {
  children: PropTypes.node.isRequired,
  underlineColor: PropTypes.string,
  underlineWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  underlineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  underlineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GeneralButton;
