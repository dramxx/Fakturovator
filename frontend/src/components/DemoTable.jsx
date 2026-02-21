import React from 'react';
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
import { useDeleteDemo } from '../api/demoApi';

function DemoTable({ demos }) {
  const deleteDemoMutation = useDeleteDemo();

  const handleDelete = async (id) => {
    deleteDemoMutation.mutate(id);
  };

  if (!demos || demos.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No content saved yet. Enter something above to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Saved Content:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demos.map((demo) => (
              <TableRow key={demo.id}>
                <TableCell>{demo.content}</TableCell>
                <TableCell>{new Date(demo.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(demo.id)}
                    aria-label="delete"
                    disabled={deleteDemoMutation.isPending}
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
}

export default DemoTable;
