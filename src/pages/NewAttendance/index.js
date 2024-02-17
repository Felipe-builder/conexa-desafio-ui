import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.png';

const NewAttendance = () => {
  return (
    <div className='new-attendance-container'>
      <div className='content'>
        <section className='form'>
          <img src={logo} alt='CONEXA'/>
          <h1>Adicionar Novo Atendimento</h1>
          <p>Adicione as informações do atendimento ao paciênte</p>
          <Link className='back-link' to='/attendances'>
            <FiArrowLeft size={16} color='#251fc5'/>
            Voltar
          </Link>
        </section>
        <form>
          <p>Informações do Paciente:</p>
          <input placeholder='Nome Completo'/>
          <input placeholder='CPF'/>
          <input placeholder='Plano de Saúde'/>
          <p>Informações da Consulta:</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker label="Data e hora da consulta"/>
          </LocalizationProvider>
          <button className='button' type='submit'>Agendar Consulta</button>
        </form>
      </div>
    </div>
  )
}

export default NewAttendance;