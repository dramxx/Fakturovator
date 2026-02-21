import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Box,
} from '@mui/material';
import { setContent, clearContent } from '../store/demoSlice';
import { useCreateDemo } from '../api/demoApi';

function DemoForm() {
  const content = useSelector((state) => state.demo.content);
  const dispatch = useDispatch();
  const createDemoMutation = useCreateDemo();

  const isSubmitting = createDemoMutation.isPending;

  const handleSubmit = async () => {
    if (!content.trim()) return;

    createDemoMutation.mutate(content, {
      onSuccess: () => {
        dispatch(clearContent());
      },
    });
  };

  const handleContentChange = (e) => {
    dispatch(setContent(e.target.value));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Enter your content"
        value={content}
        onChange={handleContentChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!content.trim() || isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Saving...' : 'Save to Database'}
      </Button>
    </Box>
  );
}

export default DemoForm;
