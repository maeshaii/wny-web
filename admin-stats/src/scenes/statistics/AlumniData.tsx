import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../global/sidebar.tsx';

const AlumniData: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const alumniList = [
    {
      id: 1,
      program: 'BSIT',
      lastName: 'Valfor',
      firstName: 'Paul Vincent',
      status: 'Employed',
      company: 'Power China Philippines',
      salary: 'Php 20,000 - 30,000',
      postGrad: ''
    },
    {
      id: 2,
      program: 'BSIT',
      lastName: 'Paquibot',
      firstName: 'Alvin',
      status: 'Unemployed',
      company: '',
      salary: '',
      postGrad: ''
    }
  ];

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchCourse = selectedCourse === 'All' || alumni.program === selectedCourse;
    const matchSearch = `${alumni.firstName} ${alumni.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCourse && matchSearch;
  });

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto' }}>
       {/* Header */}
<div
  style={{
    position: 'relative',
    backgroundColor: '#17406a',
    color: 'white',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}
>
  {/* Back Button */}
  <button
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              &lt; Back
            </button>

  {/* Centered Title */}
  <h2
    style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: 0
    }}
  >
    Alumni Data
  </h2>

  {/* Search Bar */}
  <input
    type="text"
    placeholder="🔍 Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: '6px 12px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      width: '200px',
      zIndex: 2
    }}
  />
</div>


       {/* Batch and Course Filter in the Same Row */}
<div style={{
  padding: '20px 30px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  {/* Batch Label */}
  <strong style={{ fontSize: '16px' }}>BATCH {year}</strong>

  {/* Course Dropdown */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span style={{ fontSize: '14px' }}>COURSE:</span>
    <select
      value={selectedCourse}
      onChange={(e) => setSelectedCourse(e.target.value)}
      style={{
        padding: '6px 12px',
        borderRadius: '20px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      <option value="All">All</option>
      <option value="BSIT">BSIT</option>
      <option value="BSIS">BSIS</option>
      <option value="BSCT">BIT-CT</option>
    </select>
  </div>
</div>


        {/* Table Section */}
        <div style={{ padding: '30px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}
          >
            <thead style={{ backgroundColor: '#6a74f0', color: 'white' }}>
              <tr>
                <th style={headerCell}>#</th>
                <th style={headerCell}>Program Name</th>
                <th style={headerCell}>Last Name</th>
                <th style={headerCell}>First Name</th>
                <th style={headerCell}>Status</th>
                <th style={headerCell}>Name of Company / Type of Business</th>
                <th style={headerCell}>Median / Average Salary (Monthly)</th>
                <th style={headerCell}>Post Graduate Degree</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    No alumni found.
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((alumni, index) => (
                  <tr key={alumni.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={bodyCell}>{String(index + 1).padStart(2, '0')}</td>
                    <td style={bodyCell}>{alumni.program}</td>
                    <td style={bodyCell}>{alumni.lastName}</td>
                    <td style={bodyCell}>{alumni.firstName}</td>
                    <td style={bodyCell}>{alumni.status}</td>
                    <td style={bodyCell}>{alumni.company}</td>
                    <td style={bodyCell}>{alumni.salary}</td>
                    <td style={bodyCell}>{alumni.postGrad}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const headerCell: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold'
};

const bodyCell: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left'
};

export default AlumniData;
