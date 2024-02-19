import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './styles.css';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import loginMain from '../../assets/login-main-1.png';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const response = await api.post('v1/login', data);
      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', response.data.token);
      const {data: userDoctor} = await api.get(`v1/doctor/email/${email}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      })
      console.log(userDoctor)
      localStorage.setItem('userDoctor', JSON.stringify(userDoctor))
      navigate('/attendances')
    } catch (error) {
      alert('Login failed! Tray Agains!')
    }
  }
  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logo} alt='Conexa Logo' />
        <form onSubmit={login}>
          <h1>Acesse sua conta</h1>
          <input
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className='button' type='submit'>Entrar</button>
        </form>
      </section>
      <div className='login-main-image'>
        <img src={loginMain} alt='LoginMain' />
      </div>
    </div>
  )
}

export default Login;