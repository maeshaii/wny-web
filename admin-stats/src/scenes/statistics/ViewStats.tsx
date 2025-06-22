import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../global/sidebar.tsx';

interface Graduate {
  year: number;
  status: string;
}

const graduates: Graduate[] = [
  { year: 2024, status: 'Imported' },
  { year: 2023, status: 'Imported' },
  { year: 2022, status: 'Imported' },
  { year: 2021, status: 'Imported' }
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleGenerateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCardClick = (year: number) => {
    navigate(`/AlumniData/${year}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.leftSection}>
            <button
              onClick={() => navigate(-1)}
              style={styles.backButton}
            >
              &lt; Back
            </button>
            <div style={styles.viewStatistics}>
              <span role="img" aria-label="chart">📊</span> View Statistics
            </div>
          </div>
          <button style={styles.generateBtn} onClick={handleGenerateClick}>
            Generate Statistics
          </button>
        </div>

        <div style={styles.cards}>
          {graduates.map((grad, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => handleCardClick(grad.year)}
            >
              <div style={styles.cardImage} />
              <div style={styles.cardText}>
                <p><strong>YEAR GRADUATED:</strong> {grad.year}</p>
                <p>{grad.status}</p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
  <div style={modalStyles.overlay}>
    <div style={{ ...modalStyles.modal, position: 'relative' }}>
      
      {/* X button in the upper right */}
      <button
        onClick={handleCloseModal}
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer',
          lineHeight: '1'
        }}
      >
        &times;
      </button>

      <h2 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        Generate Statistics
      </h2>

      <label>Year:</label>
      <select style={modalStyles.dropdown}>
        <option>2024</option>
        <option>2023</option>
        <option>2022</option>
      </select>

      <label>Course:</label>
      <select style={modalStyles.dropdown}>
        <option>BSIT</option>
        <option>BSIS</option>
        <option>BIT-CT</option>
      </select>

      <label>Type of Statistics:</label>
      <select style={modalStyles.dropdown}>
      <option>ALL</option>
        <option>QPRO</option>
        <option>CHED</option>
        <option>SUC</option>
        <option>AACUP</option>
      </select>

      <button style={modalStyles.button} onClick={handleCloseModal}>Generate</button>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    flex: 1,
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px'
  },
  viewStatistics: {
    fontSize: '20px',
    fontWeight: 500,
    fontFamily: 'Arial, sans-serif'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#1D4E89',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  generateBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 500
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%'
  },
  card: {
    backgroundColor: '#17406a',
    color: 'white',
    borderRadius: '15px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    width: '90%'
  },
  cardImage: {
    backgroundColor: 'white',
    height: '100px',
    width: '100%',
    borderRadius: '5px',
    marginBottom: '1px'
  },
  cardText: {
    textAlign: 'left',
    width: '100%'
  }
};

const modalStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  dropdown: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  button: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }
};

export default App;
