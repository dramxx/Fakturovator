import { useSelector, useDispatch } from 'react-redux';
import { TextField, Box } from '@mui/material';
import { setContent, clearContent } from '../store/demoSlice';
import { useCreateDemo } from '../api/demoApi';
import GeneralButton from './GeneralButton';
import { useTranslation } from 'react-i18next';

const DemoForm = () => {
  const { t } = useTranslation();
  const content = useSelector(state => state.demo.content);
  const dispatch = useDispatch();
  const { mutate: createDemo, isPending: isSubmitting } = useCreateDemo();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    createDemo(content, {
      onSuccess: () => {
        dispatch(clearContent());
      },
    });
  };

  const handleContentChange = e => {
    dispatch(setContent(e.target.value));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label={t('pages.demo.form.label')}
        placeholder={t('pages.demo.form.placeholder')}
        value={content}
        onChange={handleContentChange}
        margin="normal"
      />
      <GeneralButton
        variant="outlined"
        onClick={handleSubmit}
        disabled={!content.trim() || isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting
          ? t('pages.demo.form.saving')
          : t('pages.demo.form.saveButton')}
      </GeneralButton>
    </Box>
  );
};

export default DemoForm;
