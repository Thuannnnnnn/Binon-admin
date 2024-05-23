import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useCookies } from 'react-cookie';

export function SignIn() {
  const [authData, setAuthData] = useState({
    user_name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      authData: {
        userName: authData.user_name,
        password: authData.password,
      }
    };

    try {

      const response = await axios.post('https://shopcuathuan.shop/api/auth/login', requestData);
      const check = onChangeCookie(response.data.token)
      window.location.href = "/dashboard/home";
      console.log(check)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChangeCookie = (token) => {

    try {
      setCookie('token', token);
      return true;
    } catch (error) {
      console.log(error);
      return false
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your username
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              name="user_name"
              value={authData.user_name}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={authData.password}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
