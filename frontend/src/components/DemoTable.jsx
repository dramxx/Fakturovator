import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useDeleteDemo } from '../api/demoApi';
import { useTranslation } from 'react-i18next';

const DemoTable = ({ demos }) => {
  const { t } = useTranslation();
  const { mutate: deleteDemo } = useDeleteDemo();

  const handleDelete = async id => {
    deleteDemo(id);
  };

  if (!demos || demos.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          {t('pages.demo.table.empty')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {t('pages.demo.table.title')}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('pages.demo.table.headers.content')}</TableCell>
              <TableCell>{t('pages.demo.table.headers.date')}</TableCell>
              <TableCell align="center">
                {t('pages.demo.table.headers.actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demos.map(demo => (
              <TableRow key={demo.id}>
                <TableCell>{demo.content}</TableCell>
                <TableCell>
                  {new Date(demo.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(demo.id)}
                    aria-label={t('pages.demo.table.delete')}
                    disabled={false}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

DemoTable.propTypes = {
  demos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DemoTable;
