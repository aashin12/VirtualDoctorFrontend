import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaHeartbeat, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { medicineSuggestionApi, savePrescriptionApi } from "../services/allApi";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export default function PrescriptionForm() {
    const [medicineInput, setMedicineInput] = useState("");
    const [medicineList, setMedicineList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [prescriptionDetails, setPrescriptionDetails] = useState({
        patientName: "",
        age: "",
        gender: "Male",
        date: "",
        symptoms: "",
        diagnosis: "",
        advice: ""
    });

    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"));
        if (user && user.username) {
            setUsername(user.username);
        }
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (medicineInput.length > 1) {
                setLoading(true); // 👈 Start loading

                try {
                    const res = await medicineSuggestionApi(medicineInput);
                    setSuggestions(res.suggestions || []);
                } catch (err) {
                    console.error("Failed to fetch suggestions", err);
                }

                setLoading(false); // 👈 End loading
            } else {
                setSuggestions([]);
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [medicineInput]);


    const addMedicine = () => {
        if (medicineInput.trim() !== "") {
            setMedicineList([...medicineList, medicineInput]);
            setMedicineInput("");
        }
    };

    const removeMedicine = (index) => {
        const updated = [...medicineList];
        updated.splice(index, 1);
        setMedicineList(updated);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionDetails(prev => ({ ...prev, [name]: value }));
    };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate that all required fields are filled
  const { patientName, age, gender, date, symptoms, diagnosis, advice } = prescriptionDetails;

  if (
    !patientName.trim() ||
    !age.trim() ||
    !gender.trim() ||
    !date.trim() ||
    !symptoms.trim() ||
    !diagnosis.trim() ||
    !advice.trim() ||
    medicineList.length === 0
  ) {
    toast.warning("Please fill out all fields and add at least one medicine.");
    return;
  }

  const user = JSON.parse(sessionStorage.getItem("existingUser"));

  const formData = {
    ...prescriptionDetails,
    age: Number(age),
    medicines: medicineList,
    doctorId: user?.id
  };

  try {
    const token = sessionStorage.getItem("token");
    const res = await savePrescriptionApi(formData, token);

    toast.success("Prescription saved successfully!");

    if (res?.data?._id) {
    setTimeout(() => {
      navigate(`/preview/${res.data._id}`);
    }, 1600); // Delay navigation to allow toast to be seen
  }
  } catch (err) {
    console.error("Save failed:", err);
    alert(err.message || "Failed to save prescription.");
  }
};

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-purple-200 text-gray-800">
            <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-6 shadow-lg">
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
                   <Link to={'/'}>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <FaHeartbeat /> Virtual Doctor
                        </h1>
                   </Link>
                    <nav className="space-x-6 font-medium hidden md:flex">
                        <a href="/home" className="hover:text-yellow-300 transition">Home</a>
                        <a href="/list" className="hover:text-yellow-300 transition">Patients-History</a>
                       
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-1 rounded-full">
                            <FaUserCircle className="text-white" />
                            <span>{username}</span>
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

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 mb-20 px-6"
            >


                {/* Side Content */}
                <div className="hidden lg:block col-span-1 bg-gradient-to-br from-purple-300 to-pink-200 rounded-3xl p-8 shadow-xl border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">💡 Quick Tips</h3>
                    <ul className="space-y-2 text-sm text-purple-800">
                        <li>✅ Fill patient details accurately</li>
                        <li>💊 Use medicine search for accuracy</li>
                        <li>📝 Review diagnosis carefully</li>
                        <li>📤 Click preview before saving</li>
                    </ul>
                    <div className="mt-6 text-center" style={{ marginTop: '50px' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="doc cartoon" className="w-32 mx-auto animate-bounce" />
                        <p className="text-sm text-gray-700 mt-2">Stay safe, stay healthy!</p>

                        <div className="mt-8">
                            <h4 className="text-xl font-bold text-blue-700 mb-5">Recommended Reads</h4>
                            <div className="rounded-xl" style={{ boxShadow: '0 0 40px 12px rgba(59, 130, 246, 0.8)' }}
                            >
                                <div className="overflow-hidden rounded-xl shadow-md border border-purple-200">
                                    <div className="animate-slide w-[300%] flex rounded-xl shadow-lg" >


                                        <img
                                            src="https://imgv2-1-f.scribdassets.com/img/document/498822252/original/c4eedda6bc/1?v=1"
                                            alt="slide 1"
                                            className="w-1/3 h-90 object-cover  "
                                        />
                                        <img
                                            src="https://www.safekids.org/sites/default/files/med_2018_infographic_-_as_image_for_web-01.png"
                                            alt="slide 2"
                                            className="w-1/3 h-90 object-cover "
                                        />
                                        <img
                                            src="https://www.grxstatic.com/4f3rgqwzdznj/13ebApgmx42VfMiWgimUCm/03181ade599f54abeb697c0cf7119469/24-12_Tips_for_Giving_Medication_to_Children.png?format=png&auto=webp&width=704"
                                            alt="slide 3"
                                            className="w-1/3 h-90 object-cover"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Form */}
                <div className="col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-pink-300">
                    <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Create New Prescription</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-purple-700">Patient Name</label>
                                <input name="patientName" value={prescriptionDetails.patientName} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-2 border border-pink-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-purple-700">Age</label>
                                <input type="number" name="age" value={prescriptionDetails.age} onChange={handleChange} placeholder="30" className="w-full px-4 py-2 border border-pink-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-purple-700">Gender</label>
                                <select name="gender" value={prescriptionDetails.gender} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-md">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-purple-700">Date</label>
                                <input type="date" name="date" value={prescriptionDetails.date} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-md" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-purple-700">Symptoms</label>
                            <textarea name="symptoms" value={prescriptionDetails.symptoms} onChange={handleChange} placeholder="Fever, Cough, etc." className="w-full px-4 py-2 border border-purple-300 rounded-md"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-purple-700">Diagnosis</label>
                            <textarea name="diagnosis" value={prescriptionDetails.diagnosis} onChange={handleChange} placeholder="Example: Viral Infection" className="w-full px-4 py-2 border border-purple-300 rounded-md"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-purple-700">Medicines <span className="text-gray-500">(After selecting medicine click + sign)</span></label>
                            <div className="flex gap-2 mt-1 relative">
                                <input type="text" value={medicineInput} onChange={(e) => setMedicineInput(e.target.value)} placeholder="Search medicine..." className="flex-1 px-4 py-2 border border-purple-300 rounded-md" />

                                {loading && <p className="text-gray-500 ">Loading suggestions.. <ClipLoader size={25} color="#555" cssOverride={{
                                    borderWidth: "5px",
                                    margin: "0 auto",
                                    display: "block"
                                }} /> </p>}
                                {!loading && suggestions.length > 0 && (
                                    <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md z-10 mt-1 max-h-40 overflow-y-auto border border-purple-200">
                                        {suggestions.map((item, idx) => (
                                            <li key={idx} onClick={() => { setMedicineInput(item); setSuggestions([]); }} className="cursor-pointer hover:bg-purple-100 px-3 py-2 text-sm">{item}</li>
                                        ))}
                                    </ul>
                                )}

                                <button type="button" onClick={addMedicine} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full">
                                    <FaPlus />
                                </button>
                            </div>
                            <ul className="mt-2 space-y-2">
                                {medicineList.map((med, index) => (
                                    <li key={index} className="flex justify-between items-center bg-purple-100 px-4 py-2 rounded-md shadow">
                                        <span className="text-sm text-purple-700 font-medium">{med}</span>
                                        <button onClick={() => removeMedicine(index)} className="text-pink-500 hover:text-red-600">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-purple-700">Advice</label>
                            <textarea name="advice" value={prescriptionDetails.advice} onChange={handleChange} placeholder="Take rest, stay hydrated..." className="w-full px-4 py-2 border border-purple-300 rounded-md"></textarea>
                        </div>

                        <div className="flex justify-end gap-4">
                            
                            <button type="button"
                            onClick={handleSubmit} className="bg-pink-600 text-white px-6 py-2 rounded-full">Save Prescription</button>
                        </div>
                    </form>
                </div>
            </motion.div>

            <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white mt-20 py-6 text-center shadow-inner">
                <p className="text-sm">&copy; 2025 Virtual Doctor | Developed by Aashin</p>
            </footer>

            <ToastContainer theme="colored" position="top-center" autoClose={1500} />
        </div>
    );
}
