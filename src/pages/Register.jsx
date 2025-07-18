import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { registerApi } from "../services/allApi";

const backgroundImage =
  "https://png.pngtree.com/background/20210715/original/pngtree-gradient-purple-aiming-system-abstract-technology-background-picture-image_1258390.jpg"; 


export function Register() {

    const [userDetails,setuserDetails] = useState({
    username:"",
    email:"",
    password:""
  })
    const navigate = useNavigate()

   const handleRegister = async () => {
  const { username, email, password } = userDetails;

  // Simple email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password) {
    toast.info("Please fill in all the details");
  } else if (!emailRegex.test(email)) {
    toast.warning("Please enter a valid email address");
  } else {
    try {
      const result = await registerApi({ username, email, password });
      console.log(result);
      if (result.status === 200) {
        toast.success("Registration Successful");
        setuserDetails({ username: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (result.status === 409) {
        toast.warning(result.response.data);
        setuserDetails({ username: "", email: "", password: "" });
      } else {
        toast.error("Something went wrong");
        setuserDetails({ username: "", email: "", password: "" });
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    }
  }
};


  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-2 border-pink-800 "
      >
        <Link to={'/'}>
          <div className="text-pink-600 text-3xl font-bold mb-6 flex justify-center items-center gap-2 ">
            <FaUserMd size={30} /> Register for Virtual Doctor
          </div>
        </Link>
        <form className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={userDetails.username}
              className="w-full mt-1 px-4 py-2 rounded-md border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Dr. John Doe"
               onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
               required
              value={userDetails.email}
              className="w-full mt-1 px-4 py-2 rounded-md border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="doctor@example.com"
               onChange={(e)=>setuserDetails({...userDetails,email:e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
               required
              value={userDetails.password}
              className="w-full mt-1 px-4 py-2 rounded-md border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="••••••••"
               onChange={(e)=>setuserDetails({...userDetails,password:e.target.value})}
            />
          </div>
          <button
            type="button"
             onClick={handleRegister}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold shadow-lg"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-violet-800 hover:underline ml-1">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>

     <ToastContainer theme="colored" position="top-center" autoClose={1500}/>
     </>
  );
}