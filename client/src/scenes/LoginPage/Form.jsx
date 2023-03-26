import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';

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
  password: yup.string().required('data diperlukan'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  occupation: '',
  password: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [visibility, setVisibility] = useState(true);
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append('picturePath', values.picture.name);

    const savedUserResponse = await fetch(
      'http://localhost:5000/auth/register',
      {
        method: 'POST',
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    const data = JSON.stringify(values);
    const loggedInResponse = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  helperText={touched.firstName && errors.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  name="firstName"
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  helperText={touched.lastName && errors.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  name="lastName"
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  helperText={touched.location && errors.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  name="location"
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  helperText={touched.occupation && errors.occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  name="occupation"
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn="span 4"
                  p="0.5rem"
                  m="1rem 0"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue('picture', acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="0.7rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween gap="5px">
                            <Typography
                              sx={{
                                overflow: 'hidden',
                              }}
                            >
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="E-Mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              name="email"
              autoComplete="off"
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              name="password"
              autoComplete="off"
              type={visibility ? 'password' : 'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setVisibility(!visibility);
                      }}
                    >
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                gridColumn: 'span 4',
              }}
            />
          </Box>

          {/* Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '1rem 0',
                p: '0.8rem',
                gridColumn: 'span 4',
                borderRadius: '5px',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                cursor: 'pointer',
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
          </Box>

          <Typography
            onClick={() => {
              setPageType(isLogin ? 'register' : 'login');
              resetForm();
            }}
            sx={{
              textDecoration: 'underline',
              color: palette.primary.main,
              cursor: 'pointer',
              '&:hover': {
                color: palette.primary.light,
              },
            }}
          >
            {isLogin
              ? `Don't Have Account ? Sign Up Here..`
              : `Have an Account ? Just Login Here..`}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
