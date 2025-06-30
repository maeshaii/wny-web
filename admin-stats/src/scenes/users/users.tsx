import React, { useState } from 'react';

export interface User {
  id: number;
  name: string;
  idNumber: string;
  course: string;
  batch: string;
  status: string;
  type: 'OJT' | 'ALUMNI';
  gender?: string;
  birthDate?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  jobStatus?: string;
  company?: string;
  position?: string;
  industry?: string;
}

interface Props {
  users: User[];
  type: 'OJT' | 'ALUMNI';
  onBack: () => void;
}

export const User: React.FC<Props> = ({ users, type, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      (selectedCourse === 'All' || user.course === selectedCourse) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserDetailModal = () => (
    <div className="modal-content styled-modal">
      <h2 className="modal-title">User Profile</h2>
      <div className="detail-grid">
        <label>Name</label><input value={selectedUser?.name || ''} readOnly />
        <label>Gender</label><input value={selectedUser?.gender || 'N/A'} readOnly />
        <label>Birth Date</label><input value={selectedUser?.birthDate || 'N/A'} readOnly />
        <label>Email</label><input value={selectedUser?.email || 'N/A'} readOnly />
        <label>Phone Number</label><input value={selectedUser?.phoneNumber || 'N/A'} readOnly />
        <label>Address</label><input value={selectedUser?.address || 'N/A'} readOnly />
      </div>
      <h2 className="modal-title">Employment Information</h2>
      <div className="detail-grid">
        <label>Current Job Status</label><input value={selectedUser?.jobStatus || 'N/A'} readOnly />
        <label>Company</label><input value={selectedUser?.company || 'N/A'} readOnly />
        <label>Position</label><input value={selectedUser?.position || 'N/A'} readOnly />
        <label>Industry</label><input value={selectedUser?.industry || 'N/A'} readOnly />
      </div>
      <div className="modal-buttons">
        <button className="cancel-btn" onClick={() => setSelectedUser(null)}>Back</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="batch-toolbar">
        <div className="left">
          <button onClick={onBack} className="arrow-back-btn">&lsaquo;</button>
          <h2 style={{ margin: 0 }}>BATCH {users[0]?.batch || 'N/A'}</h2>
        </div>
        <div className="right">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="course-filter">
            <label>COURSE:</label>
            <select
              className="course-dropdown"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option>All</option>
              <option>BSIT</option>
              <option>BSIS</option>
              <option>BIT-CT</option>
            </select>
          </div>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>ID Number</th><th>Course</th><th>Batch Graduated</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              onClick={() => type === 'ALUMNI' && setSelectedUser(user)}
              style={{ cursor: type === 'ALUMNI' ? 'pointer' : 'default' }}
            >
              <td>{String(index + 1).padStart(2, '0')}</td>
              <td>{user.name}</td>
              <td>{user.idNumber}</td>
              <td>{user.course}</td>
              <td>{user.batch}</td>
              <td style={{ color: user.status === 'Employed' ? 'teal' : 'orangered' }}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="modal-backdrop">
          <div className="modal">{renderUserDetailModal()}</div>
        </div>
      )}
    </>
  );
};
