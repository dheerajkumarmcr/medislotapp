import React, { useState } from 'react';

function WritePrescription() {
  const [prescriptionDetails, setPrescriptionDetails] = useState('');
  const [prescriptionMedicine, setPrescriptionMedicine] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prescription = {
      prescriptionDetails,
      prescriptionMedicine,
      prescriptionDate
    };

    try {
      const response = await fetch('http://localhost:8089/api/prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescription),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Prescription added:', data);
      alert('Prescription submitted successfully!');
      
      // Reset form fields
      setPrescriptionDetails('');
      setPrescriptionMedicine('');
      setPrescriptionDate('');
    } catch (error) {
      console.error('Error submitting prescription:', error);
      alert('An error occurred while submitting the prescription');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Write Prescription</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Prescription Details</label>
          <input
            type="text"
            className="form-control"
            value={prescriptionDetails}
            onChange={(e) => setPrescriptionDetails(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prescription Medicine</label>
          <input
            type="text"
            className="form-control"
            value={prescriptionMedicine}
            onChange={(e) => setPrescriptionMedicine(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prescription Date</label>
          <input
            type="date"
            className="form-control"
            value={prescriptionDate}
            onChange={(e) => setPrescriptionDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Prescription
        </button>
      </form>
    </div>
  );
}

export default WritePrescription;
