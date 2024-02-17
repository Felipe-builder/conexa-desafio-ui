import { Link } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.png';

const Attendance = () => {
  return (
    <div className='attendance-container'>
      <header>
        <img src={logo} alt='Conexa'/>
        <span>Bem vindo, <strong>Felipe</strong>!</span>
        <Link className='button' to='attendance/new'>Novo Atendimento</Link>
        <button type='button'>
          <FiPower size={18} color='#cd405d'/>
        </button>
      </header>

      <h1>Atendimentos Registrados</h1>
      <ul>
        <li>
          <strong>Paciente:</strong>
          <p>James Rodrigues</p>
          <strong>Horário Marcado:</strong>
          <p>21/05/2024 às 16:30</p>
          <strong>Plano de Saúde</strong>
          <p>Não tem</p>

          <button type='button' >
            <FiEdit size={20} color='#619342'/>
          </button>
          <button type='button' >
            <FiTrash2 size={20} color='#CD405D'/>
          </button>
        </li>

        <li>
          <strong>Paciente:</strong>
          <p>James Rodrigues</p>
          <strong>Horário Marcado:</strong>
          <p>21/05/2024 às 16:30</p>
          <strong>Plano de Saúde</strong>
          <p>Não tem</p>

          <button type='button' >
            <FiEdit size={20} color='#619342'/>
          </button>
          <button type='button' >
            <FiTrash2 size={20} color='#CD405D'/>
          </button>
        </li>

        <li>
          <strong>Paciente:</strong>
          <p>James Rodrigues</p>
          <strong>Horário Marcado:</strong>
          <p>21/05/2024 às 16:30</p>
          <strong>Plano de Saúde</strong>
          <p>Não tem</p>

          <button type='button' >
            <FiEdit size={20} color='#619342'/>
          </button>
          <button type='button' >
            <FiTrash2 size={20} color='#CD405D'/>
          </button>
        </li>

        <li>
          <strong>Paciente:</strong>
          <p>James Rodrigues</p>
          <strong>Horário Marcado:</strong>
          <p>21/05/2024 às 16:30</p>
          <strong>Plano de Saúde</strong>
          <p>Não tem</p>

          <button type='button' >
            <FiEdit size={20} color='#619342'/>
          </button>
          <button type='button' >
            <FiTrash2 size={20} color='#CD405D'/>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Attendance;