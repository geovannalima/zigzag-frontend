import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useHistory} from 'react-router-dom';

import Cookies from 'universal-cookie';
import api from '../../services/api';
function My() {
    const history = useHistory();
    const cookies = new Cookies();
    const userId = cookies.get('id');
    const [slangs, setSlangs] = useState('');

    useEffect(() => {
        api.get('/slang/slangUser', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
           setSlangs(response.data)
        })
    }, [slangs]);


    async function handleLike(id) {
        try {
            await api.post(`/slang/${id}/like`);    
        } catch (error) {
            console.log(error)
        }
    }
    async function handleUserLogout(){
        cookies.remove('id', {path:'/'});
        history.push('/');    
    }


    async function newService() {
        const { value: formValues } = await Swal.fire({
            title: 'Detalhes do serviço',
            html: `<input id="swal-input1" class="swal2-input" placeholder="Nome" required> 
            <textarea id="swal-input2" class="swal2-textarea" placeholder="Exemplo"></textarea>
            <textarea id="swal-input3" class="swal2-textarea" placeholder="Explicação"></textarea>
            <select id="swal-input4" class="swal2-input">
	            <option value="" disabled selected>Selecione um estado</option>
	            <option value="AC">Acre</option>
				<option value="AL">Alagoas</option>
				<option value="AP">Amapá</option>
				<option value="AM">Amazonas</option>
				<option value="BA">Bahia</option>
				<option value="CE">Ceará</option>
				<option value="DF">Distrito Federal</option>
				<option value="ES">Espírito Santo</option>
				<option value="GO">Goiás</option>
				<option value="MA">Maranhão</option>
				<option value="MT">Mato Grosso</option>
				<option value="MS">Mato Grosso do Sul</option>
				<option value="MG">Minas Gerais</option>
				<option value="PA">Pará</option>
				<option value="PB">Paraíba</option>
				<option value="PR">Paraná</option>
				<option value="PE">Pernambuco</option>
				<option value="PI">Piauí</option>
				<option value="RJ">Rio de Janeiro</option>
				<option value="RN">Rio Grande do Norte</option>
				<option value="RS">Rio Grande do Sul</option>
				<option value="RO">Rondônia</option>
				<option value="RR">Roraima</option>
				<option value="SC">Santa Catarina</option>
				<option value="SP">São Paulo</option>
				<option value="SE">Sergipe</option>
				<option value="TO">Tocantins</option></select>
            <input id="swal-input5" class="swal2-input" placeholder="Categoria" required>`,
            focusConfirm: true,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            confirmButtonText: 'Salvar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            preConfirm: async () => {
                if (document.getElementById('swal-input4').value == "") {
                    Swal.showValidationMessage('Selecione um estado')
                }
                else if (document.getElementById('swal-input1').value && document.getElementById('swal-input2').value && document.getElementById('swal-input3').value && document.getElementById('swal-input4').value && document.getElementById('swal-input5').value) {
                    const data = {
                        name: document.getElementById('swal-input1').value,
                        example: document.getElementById('swal-input2').value,
                        explanation: document.getElementById('swal-input3').value,
                        state: document.getElementById('swal-input4').value,
                        category: document.getElementById('swal-input5').value
                    }
                    try {
                        await api.post('/slang', data, {
                            headers: {
                                Authorization: userId,
                            }
                        })
                    } catch (error) {
                        Swal.fire(
                            'erro!',
                            'algo está errado, tente novamente',
                            'error'
                        )
                    }
                } else {
                    Swal.showValidationMessage('Preencha todos os campos')
                }
            }
        })
        if (formValues) {
            Swal.fire(
                'Sucesso!',
                'Sua giria foi cadastrada com sucesso!',
                'success'
            )
        }
    }
    return (
        <div className="body-painel">
            <header>
                <h2>ZigZag Brasileiro</h2>
                <nav className="nav-header">
                    <ul>
                        <li><Link to="/painel">Todas as girias</Link></li>
                        <li onClick={handleUserLogout} className="style"><a>Sair</a></li>
                    </ul>
                </nav>
            </header>
            <section className="girias">
                <button className="btn-top" onClick={() => newService()}>Nova giria</button>
                <div className="slangs">
                    {!!slangs.length && (<table className="tableSlangs">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Exemplo</th>
                                <th>Explicação</th>
                                <th>Estado</th>
                                <th>Categoria</th>
                                <th>Likes</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
                </div>
            </section>
        </div>
    )
}
export default My;