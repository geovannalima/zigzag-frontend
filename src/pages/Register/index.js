import React from 'react';
import './main.css';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Select from '../../components/select';
import Swal from 'sweetalert2';
import logo from '../../img/logo.png';
function Register() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const options = [
        {value: 'AC', label: 'Acre'},
        {value: 'AL', label: 'Alagoas'},
        {value: 'AP', label: 'Amapá'},
        {value: 'AM', label: 'Amazonas'},
        {value: 'BA', label: 'Bahia'},
        {value: 'CE', label: 'Ceará'},
        {value: 'DF', label: 'Distrito Federal'},
        {value: 'ES', label: 'Espírito Santo'},
        {value: 'GO', label: 'Goiás'},
        {value: 'MA', label: 'Maranhão'},
        {value: 'MT', label: 'Mato Grosso'},
        {value: 'MS', label: 'Mato Grosso do Sul'},
        {value: 'MG', label: 'Minas Gerais'},
        {value: 'PA', label: 'Pará'},
        {value: 'PB', label: 'Paraíba'},
        {value: 'PR', label: 'Paraná'},
        {value: 'PE', label: 'Pernambuco'},
        {value: 'PI', label: 'Piauí'},
        {value: 'RJ', label: 'Rio de Janeiro'},
        {value: 'RN', label: 'Rio Grande do Norte'},
        {value: 'RS', label: 'Rio Grande do Sul'},
        {value: 'RO', label: 'Rondônia'},
        {value: 'RR', label: 'Roraima'},
        {value: 'SC', label: 'Santa Catarina'},
        {value: 'SP', label: 'São Paulo'},
        {value: 'SE', label: 'Sergipe'},
        {value: 'TO', label: 'Tocantins'},
        {value: 'Outros', label: 'Outro'}
    ];

    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    async function handleRegister(e) {
        e.preventDefault()
        try {
            const response = await api.post('/user', {
                nome,
                estado,
                email,
                senha,
                confirma_senha: confirmaSenha
            });
            var status = response.data.message;
            
            switch (status) {
                case 'Usuário cadastrado com sucesso!':
                    Toast.fire({
                        icon: 'success',
                        title: 'Usuário cadastrado com sucesso!'
                    })
                    break;
                case 'Este usuário já está cadastrado, tente novamente!':
                    Toast.fire({
                        icon: 'error',
                        title: 'Este usuário já existe!'
                    })
                    break;
                case 'Verifique suas senhas':
                    Toast.fire({
                        icon: 'error',
                        title: 'Verifique suas senhas'
                    })
                    break;

                default:
                    Toast.fire({
                        icon: 'error',
                        title: 'Alguma coisa deu errada com o servidor'
                    })
                    break;
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: `${error}`
            })
        }
    };

    return (
        <div className="body-login body-painel">
             <header>
                <h2>ZigZag Brasileiro</h2>
                <nav className="nav-header">
                    <ul>
                        <li><Link to={'/'}>login</Link></li>
                        <li><Link to={'/mySlangs'}>Ver girias sem cadastro</Link></li>
                    </ul>
                </nav>
            </header>
             <img src={logo} alt="logo" className="logo"/>
            <div className="section-login">
                <div className="form-login">
                    <strong>Cadastro</strong>
                    <form action="submit" onSubmit={handleRegister}>
                        <input type="text"
                            name="nome"
                            value={nome}
                            required
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome"
                        />

                        <input type="email"
                            name="email"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <Select options={options}
                            placeholder={estado || "Estado"}
                            onChange={e => setEstado(e.value)}
                            required
                        />

                        <input type="password"
                            name="senha"
                            value={senha}
                            required
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Senha"
                        />

                        <input type="password"
                            name="senha"
                            value={confirmaSenha}
                            required
                            onChange={e => setConfirmaSenha(e.target.value)}
                            placeholder="Confirma Senha"
                        />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;