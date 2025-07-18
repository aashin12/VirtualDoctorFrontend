import { motion } from "framer-motion";
import { FaCapsules } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { PiNotebookDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-violet-100 to-purple-200 overflow-hidden">
      {/* Updated Navbar */}
      <div className="flex justify-between items-center px-10 py-6 mx-6 mt-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-400 to-violet-500 shadow-2xl shadow-purple-500/60 border border-white/30 backdrop-blur-md">
        <div className="text-2xl font-bold flex items-center gap-2 text-white drop-shadow-sm">
          <FaCapsules size={28} />
          <span>Virtual Doctor</span>
        </div>
        <nav className="space-x-6 hidden md:flex text-white font-medium">
          <Link to="/home" className="hover:text-yellow-300 transition">About</Link>
          <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/home" className="hover:text-yellow-300 transition">Contact</Link>
          <Link to="/home" className="hover:text-yellow-300 transition">Community</Link>
        </nav>
        <Link
          to="/login"
          className="bg-white text-purple-700 hover:bg-blue-300 hover:text-black transition px-6 py-2 rounded-full font-semibold text-sm shadow-lg border border-purple-300"
        >
          Sign up
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-24 mt-10 md:mt-20 gap-12">
        {/* Left Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Prescription <br />
            <span className="text-violet-700">management</span> system
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Easily manage, share, and create prescriptions with our smart, modern solution.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-6 bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-3 text-md font-semibold shadow-xl border border-pink-300"
          >
            Get started <FaArrowRightLong />
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2"
        >
          <div className="bg-purple-200 rounded-xl shadow-2xl p-8 relative border border-purple-300">
            <div className="absolute -top-6 -left-6 bg-pink-500 text-white rounded-full p-4 shadow-xl border border-pink-300">
              <MdLocalHospital size={32} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white rounded-full p-4 shadow-xl border border-blue-300">
              <PiNotebookDuotone size={32} />
            </div>
            <img
              src="https://max-website20-images.s3.ap-south-1.amazonaws.com/Types_of_Doctors_1c5efbe677.jpg"
              alt="Doctor Illustration"
              className="w-full rounded-xl shadow-2xl border-2 border-white object-cover shadow-pink-500  hover:shadow-blue-700 transition duration-300 cursor-pointer"
            />
          </div>
        </motion.div>
      </div>

      {/* Extra Content */}
      <div className="px-10 md:px-24 mt-24 mb-16 text-center">
        <h2 className="text-3xl font-bold text-violet-800 mb-4">Why Choose Virtual Doctor?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Virtual Doctor is a comprehensive solution for digital healthcare. With real-time access to prescriptions, advanced patient tracking, and AI-powered insights, our platform empowers doctors and simplifies healthcare for patients.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md shadow-violet-800 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-violet-700 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">Your data is encrypted and protected under HIPAA compliance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md shadow-pink-800 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-pink-700 mb-2">Easy Prescription</h3>
            <p className="text-sm text-gray-600">Generate, store, and share prescriptions in seconds.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md shadow-blue-800 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">24/7 Access</h3>
            <p className="text-sm text-gray-600">Access your records and prescriptions anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
