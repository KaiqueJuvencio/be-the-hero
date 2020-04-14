import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {//Chama uma função em determinado momento do componente. O parametro [] é a determinação de quando essa função vai ser chamada, ou seja, colocando[ongName], sempre que ongName for mudada, o useEffect vai chamar a função
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
        
         setIncidents(incidents.filter(incident => incident.id !== id));//Manter apenas os incidents que o id for diferente do excluído. Faz excluir em tempo real
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
                <h1>Casos Cadastrados</h1>
                <ul>
                    {incidents.map(incident => (//Pra cada um dos incidents
                        //Sempre que tiver repetições, usar o key para identificar qual é qual
                        <li key={incident.id}> 
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))} 
                </ul>
        </div>
    );
}