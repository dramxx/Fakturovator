import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { getColor } from '../theme/colors';

const GeneralButton = ({
  children,
  underlineColor = getColor('primary.red'),
  underlineWidth = '8%',
  underlineHeight = '5px',
  underlineSpacing = 2,
  fontSize = '1em',
  ...buttonProps
}) => {
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
          width: underlineWidth,
          height: underlineHeight,
          backgroundColor: underlineColor,
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
