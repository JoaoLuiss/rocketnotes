import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { api } from '../../services/api';

import { Container, Form, Avatar } from "./styles";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [passwordNew, setPasswordNew] = useState();
  const [avatarURL, setAvatarURL] = useState(user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder );
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {
    const updatedUser = {
      name,
      email,
      password,
      new_password: passwordNew
    }
    await updateProfile({ updatedUser, avatarFile })
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatarURL(imagePreview);
  }

  return (
    <Container>
      <header>
        <Link to="/"><FiArrowLeft /></Link>
      </header>

      <Form>
        <Avatar>
          <img 
            src={avatarURL} 
            alt="Foto do usuário." 
          />
          <label htmlFor="avatar">
            <FiCamera/>
            <input id='avatar' type='file' onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input 
          placeholder='Nome'
          type='text'
          icon={FiUser}
          value={name}
          onChange={ event => setName(event.target.value)}
        />

        <Input 
          placeholder='E-mail'
          type='text'
          icon={FiMail}
          value={email}
          onChange={ event => setEmail(event.target.value)}
        />
        
        <Input 
          placeholder='Senha atual'
          type='password'
          icon={FiLock}
          onChange={ event => setPassword(event.target.value)}
        />

        <Input 
          placeholder='Nova senha'
          type='password'
          icon={FiLock}
          onChange={ event => setPasswordNew(event.target.value)}
        />

        <Button title='Salvar' onClick={handleUpdate} />
      </Form>
    </Container>
  )
}