import React, { useState, useEffect } from "react";

const CandidateCard = ({ candidate, onUpdateStatus, handleDelete }) => {
  const [status, setStatus] = useState("Status");

  const handleClick = () => {
    const candidateId = candidate._id?.$oid || candidate._id; // Safely access the ID
    console.log("Deleting candidate with ID:", candidateId);
    handleDelete(candidateId);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdateStatus(candidate._id, newStatus); // Call the status update function
  };

  // Ensure that the component re-renders when the status is updated
  useEffect(() => {
    setStatus(candidate.status);
  }, [candidate.status]);

  return (
    <div className="p-4 border-[#655A65] rounded-lg  bg-[#d1d0c553]">
      <h3 className="text-xl font-semibold text-[#393939]">
        {candidate.name.toUpperCase()}
      </h3>
      <p className="text-[#393939]">
        Job Title:{" "}
        {candidate.jobTitle.charAt(0).toUpperCase() +
          candidate.jobTitle.slice(1).toLowerCase()}
      </p>
      <p className="text-[#393939]">Email: {candidate.email}</p>
      <p className="text-[#393939]">Status: {status}</p>{" "}
      {/* Display the current status */}
      <div className="mt-4 space-x-2">
        <select
          value={status}
          onChange={handleStatusChange}
          className="bg-[#E8F0FE] text-black  rounded-md px-2 py-1 border-blue-400"
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
        <button
          className="bg-[#F47A1F] text-white  rounded-md px-2 py-1"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
