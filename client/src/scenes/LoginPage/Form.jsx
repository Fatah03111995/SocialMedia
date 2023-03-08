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
  const [pageType, setPageType] = useState('register');
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
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: nonMobile ? undefined : 'span 4',
              },
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
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  helperText={touched.lastName && errors.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  name="lastName"
                  sx={{
                    gridColumn: 'span 2',
                  }}
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
                  sx={{
                    gridColumn: 'span 4',
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  helperText={touched.location && errors.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  name="location"
                  sx={{
                    gridColumn: 'span 4',
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple="false"
                    onDrop={(acceptedFiles) => {
                      setFieldValue('picture', acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {values.picture.name}
                              <editOutlinedIcon />
                            </Typography>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="e-Mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              name="email"
              sx={{
                gridColumn: 'span 4',
              }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              name="password"
              sx={{
                gridColumn: 'span 4',
              }}
            />
          </Box>
          {/* Button */}
          <Box>
            <Button
              fullwidth
              type="submit"
              sx={{
                p: '1rem',
                m: '2rem 0',
                borderRadius: '5px',
                backgroundColor: palette.background.alt,
                color: palette.primary.main,
                '&:hover': {
                  color: palette.primary.main,
                },
              }}
            >
              <Typography>{isLogin ? 'LOGIN' : 'REGISTER'}</Typography>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
