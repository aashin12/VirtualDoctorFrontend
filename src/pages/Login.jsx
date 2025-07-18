import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { googleLoginApi, LoginApi } from "../services/allApi";

const backgroundImage =
  "https://static.vecteezy.com/ti/vetor-gratis/p1/6712985-resumo-saude-medico-ciencia-saude-icone-tecnologia-digital-ciencia-conceito-moderno-inovacao-tratamento-medicina-em-hi-tech-futuro-fundo-azul-para-papel-de-parede-modelo-web-design-vetor.jpg"; 

export function Login() {

    const [userDetails, setuserDetails] = useState({
    username:'',
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Please enter complete details")
    }
    else {
      const result = await LoginApi({ email, password })

      if (result.status == 200) {          //success response
        toast.success('Login Successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)


        setTimeout(() => {
            navigate('/home')
        }, 2000)

      }
      else if (result.status == 401) {
        toast.warning(result.response.data)
        setuserDetails({
          email: "",
          password: ""
        })
      }
      else if (result.status == 404) {
        toast.warning('Account does not exist..')
        setuserDetails({
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong')
        setuserDetails({
          email: "",
          password: ""
        })
      }

    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    const details = jwtDecode(credentialResponse.credential)
    // console.log(details);

    const result = await googleLoginApi({username:details.name,email:details.email,password:'googlepswd'})
    
    if(result.status==200){
      toast.success('Login Successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)


        setTimeout(() => {
            navigate('/home')
          
        }, 3500)

    }
    else if (result.status == 401) {
      toast.warning(result.response.data)
      setuserDetails({
        username: "",
        email: "",
        password: ""
      })
    } else if (result.status == 404) {
      toast.error(result.response.data)
      setuserDetails({
        username: "",
        email: "",
        password: ""
      })
    } else {
      toast.error('something went wrong')
      setuserDetails({
        username: "",
        email: "",
        password: ""
      })
    }
    
  }


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-violet-200"
      >
       <Link to={'/'}>
          <div className="text-violet-700 text-3xl font-bold mb-6 flex justify-center items-center gap-2">
            <FaUserMd size={30} /> Login to Virtual Doctor
          </div>
       </Link>
        <form className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
             onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })}
              type="email"
              value={userDetails.email}
              required
              className="w-full mt-1 px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="doctor@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
             onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
              type="password"
              required
               value={userDetails.password}
              className="w-full mt-1 px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
             onClick={handleLogin}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-md font-semibold shadow-lg"
          >
            Login
          </button>
        </form>

          {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => alert("Google login action")}
          className="w-full py-3 bg-white text-gray-800 hover:bg-gray-200 font-semibold rounded-lg flex items-center justify-center gap-2 transition duration-300"
        >
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              handleGoogleLogin(credentialResponse)
            }}
            onError={() => {
              toast.error('Login Failed');
            }}
          />

        </button>
        <p className="text-sm mt-4 text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-pink-600 hover:underline ml-1">
            Register here
          </Link>
        </p>
      </motion.div>

       <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
}
