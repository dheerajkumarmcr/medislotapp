import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8089/api";

const ViewPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    if (searchDate) {
      const filtered = prescriptions.filter((prescription) => {
        const prescriptionDate = new Date(prescription.prescriptionDate).toISOString().split('T')[0];
        return prescriptionDate === searchDate;
      });
      setFilteredPrescriptions(filtered);
    } else {
      setFilteredPrescriptions(prescriptions);
    }
  }, [searchDate, prescriptions]);

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/prescriptions`);
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      const data = await res.json();
      setPrescriptions(data);
      setFilteredPrescriptions(data);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchDate("");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="my-2">Prescription List</h2>
        </div>
        
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
                {searchDate && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                )}
              </div>
              <small className="text-muted">Filter prescriptions by date</small>
            </div>
            <div className="col-md-6 text-end">
              <button 
                className="btn btn-success"
                onClick={fetchPrescriptions}
              >
                Refresh List
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading prescriptions...</p>
            </div>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="alert alert-info">
              {searchDate 
                ? `No prescriptions found for ${new Date(searchDate).toLocaleDateString()}`
                : "No prescriptions available."}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Details</th>
                    <th>Medicine</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id}>
                      <td>{prescription.id}</td>
                      <td>{prescription.prescriptionDetails}</td>
                      <td>{prescription.prescriptionMedicine}</td>
                      <td>{new Date(prescription.prescriptionDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPrescriptions;