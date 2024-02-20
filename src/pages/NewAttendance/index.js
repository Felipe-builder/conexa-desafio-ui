import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

const NewAttendance = () => {

  const [dateTime, setDateTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');

  // const email = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const createNewAttendance = async (e) => {
    e.preventDefault();

    const data = {
      date_time: dateTime,
      patient: {
        full_name: fullName,
        cpf,
        health_insurance: healthInsurance
      }
    }

    try {
      console.log(accessToken)
      await api.post('v1/attendance', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      navigate('/attendances');
    } catch (error) {
      console.error('Erro ao criar novo atendimento:', error);
      alert('Error try create attendances!');
    }
  }

  const handleDateTimeChange = (newDateTime) => {
    setDateTime(newDateTime);
  }

  return (
    <div className='new-attendance-container'>
      <div className='content'>
        <section className='form'>
          <img src={logo} alt='CONEXA' />
          <h1>Adicionar Novo Atendimento</h1>
          <p>Adicione as informações do atendimento ao paciênte</p>
          <Link className='back-link' to='/attendances'>
            <FiArrowLeft size={16} color='#251fc5' />
            Voltar
          </Link>
        </section>
        <form onSubmit={createNewAttendance}>
          <p className='subtitles-form'>Informações do Paciente:</p>
          <input
            placeholder='Nome Completo'
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <input
            placeholder='CPF'
            required
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <input
            placeholder='Plano de Saúde'
            value={healthInsurance}
            onChange={e => setHealthInsurance(e.target.value)}
          />
          <p className='subtitles-form'>Informações da Consulta:</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Data e hora da consulta"
              value={dateTime}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
          <button className='button' type='submit'>Agendar Consulta</button>
        </form>
      </div>
    </div>
  )
}

export default NewAttendance;