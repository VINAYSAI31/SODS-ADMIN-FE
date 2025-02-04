import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Shield, Key, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Adminlogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {  
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        'https://sods-admin.up.railway.app/api/admin/checkadmin',
        { username: data.username, password: data.password },
        { withCredentials: true }
      );
      
      
      if (response.data === true) {
        login();
        navigate('/adminhome'); // Redirect on successful login
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <>
  
  <a href="https://sods-klef.vercel.app/" class="absolute top-8 left-10">
  <button class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
    Back
  </button>
</a>

      <div className="min-h-screen flex items-center justify-center p-4">
        
        <div className="background-pattern max-w-md w-full bg-white backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-center mb-8">
            <Shield className="h-12 w-12 text-purple-700" />
          </div>
          <h2 className="text-3xl font-bold text-center text-black mb-8">Admin Portal</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-700 h-5 w-5" />
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="w-full bg-white/20 border border-purple-300/30 rounded-lg py-3 px-12 text-black placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your username"
              />
              {errors.username && (
                <span className="error text-red-500">{errors.username.message}</span>
              )}
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-700 h-5 w-5" />
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full bg-white/20 border border-purple-300/30 rounded-lg py-3 px-12 text-black placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Password"
              />
              {errors.password && (
                <span className="error text-red-500">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Login as Administrator
            </button>
          </form>
          <p className="mt-4 text-center text-purple-400">
            Secure access for administrative controls
          </p>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;
