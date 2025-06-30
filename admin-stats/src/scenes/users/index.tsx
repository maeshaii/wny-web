// index.tsx
import React, { useState } from 'react';
import Sidebar from '../global/sidebar.tsx';
import { User } from './users.tsx';

const users: User[] = [/* Add your user data here */];

interface ImportForm {
  course: string;
  batch: string;
  file: File | string;
}

const UsersIndex: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'OJT' | 'ALUMNI'>('All');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importForm, setImportForm] = useState<ImportForm>({ course: '', batch: '', file: '' });
  const [viewList, setViewList] = useState<'OJT' | 'ALUMNI' | null>(null);

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setImportForm((prev) => ({
      ...prev,
      [name]: name === 'file' ? (files?.[0] || '') : value,
    }));
  };

  const handleImportSubmit = () => {
    console.log('Imported:', importForm);
    setShowImportModal(false);
    setImportForm({ course: '', batch: '', file: '' });
  };

  if (viewList) {
    const filtered = users.filter((u) => u.type === viewList);
    return <User type={viewList} users={filtered} onBack={() => setViewList(null)} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px 40px 40px', backgroundColor: '#f5f7fa', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
          <span style={{ fontSize: '24px' }}>👥</span>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Users</span>
          <select
            style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'All' | 'OJT' | 'ALUMNI')}
          >
            <option>All</option>
            <option>OJT</option>
            <option>ALUMNI</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {users
            .filter((user) => filter === 'All' || user.type === filter)
            .map((user) => (
              <div
                key={user.id}
                onClick={() => setViewList(user.type)}
                style={{
                  width: '220px',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: '120px', backgroundColor: 'white' }} />
                <div style={{ backgroundColor: '#174f84', color: 'white', padding: '15px' }}>
                  <strong style={{ fontSize: '15px', display: 'block', marginBottom: '5px' }}>
                    YEAR GRADUATED: {user.batch}
                  </strong>
                  <p style={{ margin: 0, fontSize: '14px' }}>Imported</p>
                </div>
              </div>
            ))}

          <button
            onClick={() => setShowImportModal(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: 'black',
              color: 'white',
              fontSize: '32px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            +
          </button>
        </div>

        {showImportModal && (
          <div
            onClick={() => setShowImportModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#a9dce3',
                borderRadius: '24px',
                padding: '30px',
                width: '420px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold', margin: '20px 0 10px' }}>
                Import Alumni Data
              </h2>
              <label>Course</label>
              <input
                name="course"
                value={importForm.course}
                onChange={handleImportChange}
                style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '14px' }}
              />
              <label>Batch Graduated</label>
              <input
                name="batch"
                value={importForm.batch}
                onChange={handleImportChange}
                style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '14px' }}
              />
              <label>Upload File</label>
              <input
                name="file"
                type="file"
                onChange={handleImportChange}
                style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '14px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <button
                  onClick={handleImportSubmit}
                  style={{
                    padding: '10px 30px',
                    fontSize: '14px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: 'none',
                    background: '#f26c4f',
                    color: 'white',
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => setShowImportModal(false)}
                  style={{
                    padding: '10px 30px',
                    fontSize: '14px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: '1px solid #444',
                    background: 'white',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersIndex;
