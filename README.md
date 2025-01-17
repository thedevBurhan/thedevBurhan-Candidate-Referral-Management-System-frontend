## Candidate Referral Management System (Frontend)

This is the frontend part of the Candidate Referral Management System. It allows users to add candidates, update their status, search for candidates, and view candidate details.

## Features

1.Add candidates with details such as name, email, phone number, job title, and resume.
2.Update the status of candidates (Pending, Reviewed, Hired).
3.Delete candidates from the list.
4.Search for candidates by job title or status.
5.Fully responsive design for all screen sizes.

## Tech Stack

1.Frontend: React, TailwindCSS
2.State Management: React Hooks (useState, useEffect)
3.API: Axios for making API requests
4.CSS Framework: TailwindCSS for styling

## Install the dependencies:

npm install

## Create a .env file at the root of the project and add the following environment variable:

REACT_APP_API_URL=http://localhost:5000/api

## Start

npm start

## UI Components

## ReferralForm
This is the form component used for adding new candidates. It includes input fields for the candidate’s name, email, phone number, job title, and resume file upload. After the form is submitted, the data is sent to the backend API, and the UI is updated with the new candidate's details.

## CandidateCard
Each candidate is displayed in a card that shows their details such as name, job title, email, and status. Users can update the status or delete a candidate.

## Dashboard
This is the main page where all the candidates are displayed. It contains:

1.A search bar to filter candidates by job title or status.
2.A list of candidates displayed in grid format.
3.Integration of ReferralForm for adding new candidates.
4.CandidateCard for displaying individual candidate information.


## Endpoints
GET /api/candidates - Fetch all candidates.
POST /api/candidates - Add a new candidate.
PUT /api/candidates/:id/status - Update the status of a candidate.
DELETE /api/candidates/:id - Delete a candidate.