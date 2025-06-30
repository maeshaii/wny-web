import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../images/ctu.jpg';
import { getCookie } from '../utils/csrf';

axios.defaults.withCredentials = true;


const Login = () => {
  const navigate = useNavigate();
  const [acc_username, setUsername] = useState('');
  const [acc_password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get CSRF cookie when component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/csrf/')
      .then(() => console.log('CSRF cookie set'))
      .catch(() => console.error('CSRF cookie fetch failed'));
  }, []);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPassword = new Date(acc_password).toISOString().split('T')[0];
    const csrfToken = getCookie('csrftoken');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        {
          acc_username,
          acc_password: formattedPassword,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken || '',
          },
        }
      );

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Invalid CTU ID or Birthdate');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <img src={background} alt="Background" style={styles.backgroundImage} />
      </div>

      <div style={styles.rightSection}>
        <h2 style={styles.h2}>Welcome</h2>
        <h1 style={styles.h1}>Technologist</h1>
        <p style={styles.p}>Connect & Collaborate</p>

        <form style={styles.form} onSubmit={handleLogin}>
          <label htmlFor="ctu-id" style={styles.label}>CTU ID</label>
          <input
            type="text"
            id="ctu-id"
            placeholder="Enter your CTU ID"
            required
            value={acc_username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <label htmlFor="birthdate" style={styles.label}>Birthdate</label>
          <input
            type="date"
            id="birthdate"
            required
            value={acc_password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}

          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftSection: {
    width: '50%',
  },
  backgroundImage: {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
  },
  rightSection: {
    width: '50%',
    backgroundColor: '#1e3a8a',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  h2: {
    margin: 0,
  },
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  p: {
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  label: {
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    border: 'none',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    color: '#1e3a8a',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: 10,
    width: '40%',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default Login;
