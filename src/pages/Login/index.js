import React from 'react';
import './main.css';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import logo from '../../img/logo.png';

function Login() {
    const cookies = new Cookies();
    const history = useHistory();

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

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            senha
        };

        const response = await api.post('/sessions', data);

        if (response.data.message === 'logado') {
            await cookies.set('id', response.data.user, { path: '/' });
            setTimeout(function () {
                history.push('/painel');
            }, 2000);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Usuário ou senha incorretos'
            })
        }
    }

    return (
        
        <div className="body-login body-painel">
             <header>
                <h2>ZigZag Brasileiro</h2>
                <nav className="nav-header">
                    <ul>
                        <li><Link to={'/slangs'}>Ver girias sem cadastro</Link></li>
                    </ul>
                </nav>
            </header>
            <img src={logo} alt="logo" className="logo" />
            <div className="section-login">
                <div className="form-login">
                    <strong>Login</strong>
                    <form action="submit" onSubmit={handleLogin}>
                        <input type="email"
                            name="email"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input type="password"
                            name="senha"
                            value={senha}
                            required
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Senha"
                        />

                        <button type="submit">Logar</button>
                    </form>
                    <div className="buttonRegister">
                        <Link to={'/register'}>Ainda não é registrado? <span>Cadastrar</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;