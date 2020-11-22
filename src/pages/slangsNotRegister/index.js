import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import api from '../../services/api';
function SlangsNot() {
    const history = useHistory();
    const cookies = new Cookies();
    const [slangs, setSlangs] = useState('');

    useEffect(() => {
        api.get('/slang', {
        }).then(response => {
            setSlangs(response.data);
        })
    }, [setSlangs]);


    async function handleLike(id) {
        try {
            await api.post(`/slang/${id}/like`);    
        } catch (error) {
            console.log(error)
        }
    }
    async function handleBusca(e) {
        try {
            let name = e.target.value
            const response = await api.post('/slang/filter', {
               name
            });
           setSlangs(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="body-painel">
            <header>
                <h2>ZigZag Brasileiro</h2>
                <nav className="nav-header">
                    <ul>
                        <li><Link to={'/'}>Login</Link></li>
                    </ul>
                </nav>
            </header>
            <section className="girias">
                <div className="slangs">
                <input className="inputBusca" onChange={handleBusca} type="search" placeholder="Filtras Girias"/>
                    {!!slangs.length && (<table className="tableSlangs">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Exemplo</th>
                                <th>Explicação</th>
                                <th>Estado</th>
                                <th>Categoria</th>
                                <th>Likes</th>
                                <th>Dar like</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slangs.map(slang => (
                                <tr key={slang.id}>
                                    <td>{slang.name}</td>
                                    <td>{slang.example}</td>
                                    <td>{slang.explanation}</td>
                                    <td>{slang.state}</td>
                                    <td>{slang.category}</td>
                                    <td>{slang.likes}</td>
                                    <td><button onClick={() => handleLike(slang.id)} className="btnTableService">Dar like</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
                </div>
            </section>
        </div>
    )
}
export default SlangsNot;