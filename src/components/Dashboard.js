import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateCard from "./CandidateCard";
import ReferralForm from "./ReferralForm";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const addCandidate = (newCandidate) => {
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/candidates`);
        setCandidates(res.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setError("Error fetching candidates. Please try again.");
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      candidate.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/candidates/${id}/status`,
        { status: "Reviewed" }
      );
      setCandidates(candidates.map((c) => (c._id === id ? res.data : c)));
    } catch (error) {
      console.error("Error updating candidate status:", error);
      setError("Error updating status. Please try again.");
    }
  };

  const handleDelete = async (candidateId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/candidates/${candidateId}`
      );
      // Remove the deleted candidate from the state
      setCandidates(candidates.filter((candidate) => candidate._id !== candidateId));
      alert("Candidate deleted successfully");
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Error deleting candidate. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
    <ReferralForm addCandidate={addCandidate} />
    <div className="flex justify-center text-center">
      <input
        type="text"
        placeholder="Search by job title or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border w-full sm:w-96" 
      />
    </div>
    {error && <p className="text-red-500 text-center">{error}</p>}
    <div className="lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 lg:mx-5 sm:mx-2">
      {filteredCandidates.map((candidate) => (
        <CandidateCard
          key={candidate._id}
          candidate={candidate}
          onUpdateStatus={handleUpdateStatus}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  </div>
  
  );
};

export default Dashboard;
