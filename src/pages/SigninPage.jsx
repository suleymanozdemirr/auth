import Layout from "../components/layout"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { HiAtSymbol } from "react-icons/hi"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginSchema } from "../schema/yup"
import { useFormik } from "formik"
import axios from "axios"

const initialValues = {
  email: "",
  password: "",
}

export default function SigninPage() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        axios
          .get("http://localhost:8000/users/", {
            params: {
              email: values.email,
              password: values.password,
            },
          })
          .then((result) => {
            console.log("result")
            result.data.length > 0 && navigate("/home")
          })
          .catch((err) => console.error(err))
        console.log(values)
      },
    })
  return (
    <Layout>
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <Stack spacing={4}>
          <Typography variant='h4' fontWeight={600} color={"grey.800"}>
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <TextField
                  type='email'
                  name='email'
                  label='Email'
                  variant='outlined'
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    width: "40ch",
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          color: "#a7b4c4",
                          cursor: "none",
                        }}
                      >
                        <HiAtSymbol size={20} />
                      </IconButton>
                    ),
                  }}
                />

                <TextField
                  type={show ? "text" : "password"}
                  name='password'
                  label='Password'
                  variant='outlined'
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ width: "40ch" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShow(!show)}>
                        {show ? (
                          <MdVisibility size={20} />
                        ) : (
                          <MdVisibilityOff size={20} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>

              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{
                  padding: "12px",
                  bgcolor: "blue[700]",
                  fontSize: "13px",
                  "&:hover": {
                    bgcolor: "blue[90]",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                size='medium'
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "flex-start",
                  padding: "12px",
                  border: "1px solid #222",
                  fontSize: "13px",
                  color: "#222",
                }}
              >
                <FcGoogle size={20} className='mr-7' />
                Sign in with Google
              </Button>
            </Stack>
          </form>
          <Stack
            direction='row'
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Don't have an account?
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                cursor: "pointer",
                color: "#1976D2",
              }}
            >
              <Link to={"/register"}>SignUp</Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}
