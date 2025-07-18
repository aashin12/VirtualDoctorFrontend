import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUserCircle, FaSignOutAlt, FaEye } from "react-icons/fa";
import { getAllPrescriptionsApi } from "../services/allApi";
import { toast } from "react-toastify";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
   const user = JSON.parse(sessionStorage.getItem("existingUser"));
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await getAllPrescriptionsApi(token);
      if (response.status === 200) {
        setPrescriptions(response.data);
      } else {
        toast.error("Failed to load prescriptions.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching data.");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-pink-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
          <Link to={'/'}>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FaHeartbeat /> Virtual Doctor
            </h1>
          </Link>
          <nav className="space-x-6 font-medium hidden md:flex">
            <a href="/home" className="hover:text-yellow-300 transition">Home</a>
            <a href="/home" className="hover:text-yellow-300 transition">Patients-History</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-1 rounded-full">
              <FaUserCircle className="text-white" />
              <span>{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full shadow"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">All Prescriptions</h2>

        {prescriptions.length === 0 ? (
          <p className="text-center text-gray-600">No prescriptions available.</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {prescriptions.map((prescription) => (
              <motion.div
                key={prescription._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-l-4 border-pink-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-purple-700">
                    {prescription.patientName}
                  </h3>
                  <p className="text-sm text-gray-600">{prescription.date}</p>
                </div>
                <ul className="text-sm text-gray-800 mb-4 space-y-1">
                  <li><strong>Age:</strong> {prescription.age}</li>
                  <li><strong>Gender:</strong> {prescription.gender}</li>
                  <li><strong>Diagnosis:</strong> {prescription.diagnosis}</li>
                  <li><strong>Symptoms:</strong> {prescription.symptoms}</li>
                  <li><strong>Medicines:</strong> {prescription.medicines.join(', ')}</li>
                </ul>
                <button
                  onClick={() => navigate(`/preview/${prescription._id}`)}
                  className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-md transition"
                >
                  <FaEye /> View
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white mt-20 py-6 text-center shadow-inner">
        <p className="text-sm">&copy; 2025 Virtual Doctor | Developed by Aashin</p>
      </footer>
    </div>
  );
};

export default PrescriptionList;
