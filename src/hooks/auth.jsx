import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

// aqui é criado o contexto
const AuthContext = createContext({});

/**
 * HOOK de autenticação;
 * a prop 'children' é toda <Rotes /> que for acessada na main.jsx
 */
function AuthProvider({ children }) {
	const [data, setData] = useState({})

	async function signIn({ email, password }) {
		try {
			// envia a requisição de se autenticar no backend (api)
			const response = await api.post('/sessions', { email, password });
			// desestrutura as informações da resposta que o front (aqui) recebeu
			const { user, token } = response.data;

			// usar o localStorage do navegador para armazenar os dados do usuário e do token
			localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
			localStorage.setItem('@rocketnotes:token', token);
			// adiciona por padrão, todas as requisições futuras terão no cabeçalho o token que recebeu na autenticação acima OBS: estamos no frontend
			// api.defaults.headers.authorization = `Bearer ${token}`;
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			// passa as informações de dentro dessa função para o contexto desse componente
			setData({ user, token });
			
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				alert('Não foi possível entrar.')
			}
		} 
	}

	function signOut() {
		if ( confirm('Deseja realmente sair?') ) {

			localStorage.removeItem('@rocketnotes:token');
			localStorage.removeItem('@rocketnotes:user');
			
			setData({});
		}
	}

	async function updateProfile({ updatedUser: user, avatarFile }) {
		try {
			if (avatarFile) {
				const fileUploadForm = new FormData();
				fileUploadForm.append('avatar', avatarFile);

				const response = await api.patch('/users/avatar', fileUploadForm);
				user.avatar = response.data.avatar;
			}

			console.log(user);
			await api.put('/users', user);
			localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
			setData({  user, token: data.token });
			alert('Perfil atualizado.');
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				alert('Não foi possível atualizar o perfil.')
			}
		} 
	}

	useEffect( () => {
		const token = localStorage.getItem('@rocketnotes:token');
		const user = localStorage.getItem('@rocketnotes:user');
		
		if (token && user) {
			// api.defaults.headers.authorization = `Bearer ${token}`;
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			setData({ token, user: JSON.parse(user) });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ 
			signIn, 
			signOut, 
			updateProfile,
			user: data.user 
		}} >
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const consumeContext = useContext(AuthContext);

	return consumeContext;
}

export { AuthProvider, useAuth };
