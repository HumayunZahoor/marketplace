import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        
        const { token, user } = response.data;
  
        if (user) {
          const { name, email, role } = user;
         
          console.log('Token:', token);
          console.log('Name:', name);
          console.log('Email:', email);
          console.log('Role:', role);
  
          dispatch(login({ email , name , role }));
          toast.success(`Welcome: ${name}`); 

          if(role === "SuperAdmin") {
            navigate('/AdminPortal');
          } else if (role === "Seller") {
            navigate('/SellerPortal')
          } else {
            navigate('/Shop')
          }
      
        } else {
          console.error('User data is not available in the response.');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert(error.message)
    }
  };
  
  return (
    <div className="flex justify-center items-centermax-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-indigo-950">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-indigo-950 text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 text-indigo-950">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-950 text-white p-2 rounded-lg hover:bg-indigo-900 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link to="/Register" className="text-indigo-950 font-semibold hover:underline">
              Register here
            </Link>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600">Forget Password...?</span>{' '}
            <Link to="/ChangePassword" className="text-indigo-950 font-semibold hover:underline">
              Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
 