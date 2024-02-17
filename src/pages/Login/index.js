import React from 'react';
import './styles.css';
import logo from '../../assets/logo.png';
import loginMain from '../../assets/login-main-1.png';

const Login = () => {
  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logo} alt='Conexa Logo'/>
        <form>
          <h1>Acesse sua conta</h1>
          <input placeholder='Email'/>
          <input type='password' placeholder='Senha'/>
          <button className='button' type='submit'>Entrar</button>
        </form>
      </section>
      <div className='login-main-image'>
        <img src={loginMain} alt='LoginMain'/>
      </div>
    </div>
  )
}

export default Login;