import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const EditAttendance = () => {
  const { attendance_id } = useParams();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [originalCPF, setOriginalCPF] = useState('');
  const [newCPF, setNewCPF] = useState('');

  const [id, setId] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [pacientFullName, setPacientFullName] = useState('');
  const [pacientCpf, setPacientCpf] = useState('');
  const [pacientHealthInsurance, setPacientHealthInsurance] = useState('');

  const accessToken = localStorage.getItem('accessToken');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setOriginalCPF(pacientCpf);
  };

  const handleCloseDialog = (confirmed) => {
    setIsDialogOpen(false);
    console.log(confirmed)
    if (confirmed) {
      setPacientCpf(newCPF)
    } else {
      setNewCPF('');
      setPacientCpf(originalCPF);
    }
  };

  const handleNewCPFSubmit = async () => {
    try {
      const response = await api.get(`/v1/patient/findByCpf/${newCPF}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data)
      setPacientFullName(response.data.full_name);
      setPacientCpf(response.data.cpf);
      setPacientHealthInsurance(response.data.health_insurance || 'Sem plano de saúde');
      handleCloseDialog(true);
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      alert('Erro ao buscar paciente!');
    }
  };

  useEffect(() => {
    api.get(`/v1/attendance/${attendance_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      setId(response.data.id);
      setDateTime(response.data.date_time);
      setPacientFullName(response.data.patient.full_name);
      setPacientCpf(response.data.patient.cpf);
      setOriginalCPF(response.data.patient.cpf);
      setPacientHealthInsurance(response.data.patient.health_insurance || 'Sem plano de saúde');
    }).catch((error) => {
      console.error('Erro ao buscar atendimento:', error);
      alert('Error try find attendances!');
      navigate('/attendances')
    });
  }, [attendance_id, navigate, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id,
      date_time: dateTime,
      patient: {
        full_name: pacientFullName,
        cpf: pacientCpf,
        health_insurance: pacientHealthInsurance
      }
    };
    console.log(data)
    try {
      await api.put(`/v1/attendance`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      navigate('/attendances');
    } catch (error) {
      console.error('Erro ao editar consulta:', error);
      alert('Erro ao editar consulta!');
    }
  };

  const handleDateTimeChange = (newDateTime) => {
    setDateTime(newDateTime);
  }

  return (
    <div className='edit-attendance-container'>
      <div className='content'>
        <section className='form'>
          <img src={logo} alt='CONEXA' />
          <h1>Editar Atendimento</h1>
          <p>Adicione as informações do atendimento ao paciênte</p>
          <Link className='back-link' to='/attendances'>
            <FiArrowLeft size={16} color='#251fc5' />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <p className='subtitles-form'>Informações do Paciente:</p>
          <div className='patient-info'>
            <div className='fields-container'>
              <input
                className='blocked-field'
                placeholder='Nome Completo'
                value={pacientFullName}
                readOnly
                onChange={e => setPacientFullName(e.target.value)}
              />

              <input
                className='blocked-field'
                placeholder='CPF'
                value={pacientCpf}
                readOnly
                onChange={e => setPacientCpf(e.target.value)}
              />

              <input
                className='blocked-field'
                placeholder='Plano de Saúde'
                value={pacientHealthInsurance}
                onChange={e => setPacientHealthInsurance(e.target.value)}
              />
            </div>
            <Button className='change-patient' style={{ backgroundColor: '#e1a205' }} variant="contained" onClick={handleOpenDialog}>Alterar Paciente</Button>
          </div>
          <div className='attendance-content'>
            <p className='subtitles-form'>Informações da Consulta:</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Data e hora da consulta"
                value={dateTime}
                onChange={handleDateTimeChange}
              />
            </LocalizationProvider>
          </div>
          <button className='button' type='submit'>Salvar</button>
        </form>
      </div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Alterar CPF do Paciente</DialogTitle>
        <DialogContent>
          <TextField
            label="Novo CPF"
            value={newCPF}
            onChange={e => setNewCPF(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleNewCPFSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditAttendance;