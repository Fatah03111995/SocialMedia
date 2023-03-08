import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import editOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import { Password } from '@mui/icons-material';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('diperlukan'),
  lastName: yup.string().required('diperlukan'),
  email: yup.string().email('Coba ketik dengan benar').required('diperlukan'),
  password: yup.string().required('diperlukan'),
  location: yup.string().required('diperlukan'),
  occupation: yup.string().required('diperlukan'),
  picture: yup.string().required('diperlukan'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Coba ketik dengan benar').required('diperlukan'),
  Password: yup.string().required(),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  occupation: '',
};
const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nonMobile = useMediaQuery('(min-width: 1000px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const handleFormSubmit = async (values, onSubmitProps) => {};
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        pageType === 'login' ? initialValuesLogin : initialValuesRegister
      }
      validationSchema={pageType === 'login' ? loginSchema : registerSchema}
    >
      {() => {
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: nonMobile ? undefined : 'span 4',
              },
            }}
          ></Box>
        </form>;
      }}
    </Formik>
  );
};

export default Form;
