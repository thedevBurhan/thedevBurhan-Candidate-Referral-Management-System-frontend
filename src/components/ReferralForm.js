import React, { useState } from 'react';
import axios from 'axios';

const ReferralForm = ({ addCandidate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    // Initialize FormData
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('jobTitle', formData.jobTitle);
  
    // Only append 'resume' if it's available
    if (formData.resume) {
      data.append('resume', formData.resume);
    }
  
    try {
      // Make the API request to submit the form data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/candidates`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure correct content type
        },
      });
  
      // After successful submission, add the new candidate and reset the form
      addCandidate(response.data);
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resume: null, // Reset resume after form submission
      });
  
      alert('Candidate referred successfully');
    } catch (error) {
      // Handle errors
      console.error('Error referring candidate:', error.message);
      if (error.response) {
        // Backend error message
        setError(error.response.data.message || 'Error referring candidate. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="container p-4 sm:p-2 border bg-[#d1d0c553] rounded-lg text-center mx-auto">
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Candidate Name"
    className="p-2 rounded-md mx-2 w-full sm:w-auto"
    required
  />
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email"
    className="p-2 rounded-md mx-2 w-full sm:w-auto"
    required
  />
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Phone Number"
    className="p-2 rounded-md mx-2 w-full sm:w-auto"
    required
  />
  <input
    type="text"
    name="jobTitle"
    value={formData.jobTitle}
    onChange={handleChange}
    placeholder="Job Title"
    className="p-2 rounded-md mx-2 w-full sm:w-auto"
    required
  />
  <input
    type="file"
    name="resume"
    onChange={handleFileChange}
    accept=".pdf"
    className="p-2 rounded-md mx-2 w-full sm:w-auto"
    
  />
  <button
    type="submit"
    className="bg-[#F47A1F] text-white rounded-md px-4 py-2 w-full sm:w-auto"
    disabled={loading}
  >
    {loading ? 'Submitting...' : 'Submit'}
  </button>
  {error && <p className="text-red-500 mt-2">{error}</p>}
</form>

  );
};

export default ReferralForm;
