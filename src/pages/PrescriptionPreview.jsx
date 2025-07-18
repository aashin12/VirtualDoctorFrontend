import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { printPrescriptionApi } from '../services/allApi';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrescriptionPreview = () => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const doctor = JSON.parse(sessionStorage.getItem("existingUser"));
  const doctorName = doctor?.username || "Dr. Unknown";

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await printPrescriptionApi(id);
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescription();
  }, [id]);

  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    html2canvas(input, { scale: 2, useCORS: true })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const safeFileName = `${doctor?.username?.replace(/[^a-z0-9]/gi, '_') || 'Doctor'}_Prescription`;
        pdf.save(`${safeFileName}.pdf`);
      })
      .catch(error => {
        console.error("PDF generation failed", error);
      });
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading prescription...</p>;
  if (!prescription) return <p className="text-center text-red-500 mt-10">Prescription not found.</p>;

  return (
    <div className="p-4" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
            backgroundColor: "#fdfdfd",
            backgroundSize: "cover",}}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Download PDF
          </button>
        </div>

        <div
          id="pdf-content"
          style={{
             backgroundColor: "#ffffff",
            color: "#000000",
            padding: "2.5rem",
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "12px",
            border: "2px solid #374151",
            boxShadow: "0 8px 24px rgba(0,0,0,1)",
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
          }}
        >
          {/* Header */}
          <header style={{ borderBottom: "2px solid #cbd5e1", paddingBottom: "1rem", marginBottom: "1.5rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e3a8a" }}>Doctor Prescription</h1>
            <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>Virtual Doctor Clinic, Ernakulam</p>
            <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>Phone: 0484-1234567</p>
          </header>

          {/* Patient Info */}
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>Patient Details</h2>
            <p><strong>Name:</strong> {prescription.patientName}</p>
            <p><strong>Age:</strong> {prescription.age}</p>
            <p><strong>Gender:</strong> {prescription.gender}</p>
            <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString()}</p>
          </section>

          {/* Dynamic Sections */}
          {prescription.symptoms && (
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>Symptoms</h2>
              <p>{prescription.symptoms}</p>
            </section>
          )}

          {prescription.diagnosis && (
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>Diagnosis</h2>
              <p>{prescription.diagnosis}</p>
            </section>
          )}

          {Array.isArray(prescription.medicines) && prescription.medicines.length > 0 && (
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>Medicines</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f1f5f9" }}>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Medicine</th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Dosage</th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{medicine}</td>
                      <td style={{ border: "1px solid #ccc", padding: "0.5rem", fontStyle: "italic" }}>Daily</td>
                      <td style={{ border: "1px solid #ccc", padding: "0.5rem", fontStyle: "italic" }}>Morning</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {prescription.advice && (
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>Advice</h2>
              <p>{prescription.advice}</p>
            </section>
          )}

          {/* Footer */}
          <footer style={{ borderTop: "1px solid #ccc", paddingTop: "1rem", marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.875rem" }}>
            <div>
              <p style={{ fontWeight: "600" }}>Dr. {doctorName}</p>
              <p>Signature: __________________</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <img
                src="https://c8.alamy.com/comp/J253HG/doctor-stamp-illustration-J253HG.jpg"
                alt="Stamp"
                style={{ width: "6rem", height: "6rem", objectFit: "contain" }}
              />
              <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>Official Stamp</p>
            </div>
          </footer>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "1rem", color: "#000000" }}>
            Authorized by VirtualDoctor • www.virtualDoctor.com
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrescriptionPreview;
