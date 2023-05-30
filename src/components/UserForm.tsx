import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { authenticateUser, loginUser, registerUser } from '../reducers/userReducer';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const UserForm = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(loginUser({email: loginEmail, password: loginPassword}))
    const token = localStorage.getItem("access_token");
    if (token) dispatch(authenticateUser({access_token: token, refresh_token: ""}))
  }

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser({
        email: registerEmail, 
        password: registerPassword, 
        name: registerName, 
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"}))
        .then(() => {
          dispatch(loginUser({email: registerEmail, password: registerPassword}))
        });
  }

  return (
    <Box sx={{ bgcolor: 'white', width: 700 }}>
      <AppBar position="static" sx={{ bgcolor: "#282c34" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
            <form onSubmit={(e) => submitLogin(e)} style={{ width: "100%", boxSizing: "border-box" }}>
                <FormControl 
                    sx={{ gap: "1em", justifyContent: "center", width: "100%", boxSizing: "border-box", padding: "0em 10em" }}
                >
                    <TextField 
                    id="standard-basic-login" 
                    label="E-mail" 
                    variant="standard" 
                    onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <Typography
                    component={'span'}
                    color={"red"}
                    fontSize={14}
                    fontWeight={"bold"}
                    >
                        {user.errorMessageLogin}
                    </Typography>
                    <Button type='submit'>
                        Login
                    </Button>
                </FormControl>
            </form>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <form onSubmit={(e) => submitRegister(e)} style={{ width: "100%", boxSizing: "border-box" }}>
                <FormControl 
                    sx={{ gap: "1em", justifyContent: "center", width: "100%", boxSizing: "border-box", padding: "0em 10em" }}
                >
                    <TextField 
                    id="standard-basic-register" 
                    label="Name" 
                    variant="standard" 
                    onChange={(e) => setRegisterName(e.target.value)}
                    />
                    <TextField 
                    id="standard-basic" 
                    label="E-mail" 
                    variant="standard" 
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <Typography
                    component={'span'}
                    color={"red"}
                    fontSize={14}
                    fontWeight={"bold"}
                    >
                        {user.errorMessageRegister}
                    </Typography>
                    <Button type='submit'>
                        Register
                    </Button>
                </FormControl>
            </form>
        </TabPanel>
    </Box>
  );
}

export default UserForm;