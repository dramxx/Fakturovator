import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SectionTitle from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = event => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SectionTitle>{t('pages.settings.title')}</SectionTitle>

      <Box sx={{ mt: 4, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">
            {t('settings.language')}
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={i18n.language}
            label={t('settings.language')}
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="sk">SK</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SettingsPage;
