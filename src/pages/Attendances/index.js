import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const Attendances = () => {

  const [attendances, setAttendances] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const userDoctor = JSON.parse(localStorage.getItem('userDoctor'));
  const navigate = useNavigate();
  
  const logout = async (id) => {
    localStorage.clear()
    try {
      await api.post(`v1/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      setAttendances(attendances.filter(attendance => attendance.id !== id ));
      navigate('/login');

    } catch (error) {
      alert('Delete failed! Try again.');
    }
  } 
  const deleteAttendance = async (id) => {
    try {
      await api.delete(`v1/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      setAttendances(attendances.filter(attendance => attendance.id !== id ));
    } catch (error) {
      alert('Delete failed! Try again.');
    }
  } 

  useEffect(() => {
    api.get('v1/attendance', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        page: 0,
        size: 9,
        direction: 'asc'
      }
    }).then(response => {
      setAttendances(response.data._embedded.attendanceDTOList);
    });
  }, [accessToken]);

  return (
    <div className='attendance-container'>
      <header>
        <img src={logo} alt='Conexa'/>
        <span>Bem vindo, <strong>{userDoctor.full_name}</strong>!</span>
        <Link className='button' to='new_attendance'>Novo Atendimento</Link>
        <button onClick={logout} type='button'>
          <FiPower size={18} color='#cd405d'/>
        </button>
      </header>
                
      <h1>Atendimentos Registrados</h1>
      <ul>
        {attendances.map(attendance => (
        <li key={attendance.id}>
          <strong>Paciente:</strong>
          <p>{attendance.patient.full_name}</p>
          <strong>Horário Marcado:</strong>
          <p>{new Date(attendance.date_time).toLocaleString('pt-BR')}</p>
          <strong>Plano de Saúde</strong>
          <p>{attendance.health_insurance || 'Sem plano de saúde'}</p>

          <button type='button' >
            <FiEdit size={20} color='#619342'/>
          </button>
          <button onClick={() => deleteAttendance(attendance.id)} type='button' >
            <FiTrash2 size={20} color='#CD405D'/>
          </button>
        </li>

        ))}
      </ul>
    </div>
  )
}

export default Attendances;