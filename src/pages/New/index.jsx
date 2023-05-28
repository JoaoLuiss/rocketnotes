import { Link, useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { Container, Form } from './styles'
import { useState } from 'react'
import { api } from '../../services/api'

export function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks( (prevState) => [...prevState, newLink]);
    setNewLink('');
  }

  function handleRemoveLink(linkToBeDeleted) {
    setLinks( prevState => prevState.filter( link => link !== linkToBeDeleted) );
  }

  function handleAddTag() {
    setTags( prevState => [...prevState, newTag]);
    setNewTag('');
  }

  function handleRemoveTag(tagToBeDeleted) {
    setTags( prevState => prevState.filter( tag => tag !== tagToBeDeleted));
  }

  async function handleNewNote() {
    await api.post('/notes', { title, description, tags, links });
    alert('Nota criada com sucesso!');
    navigate('/');
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>
          <Input 
            placeholder='Título'
            onChange={ event => setTitle(event.target.value) }
          />

          <TextArea 
            placeholder='Observações' 
            onChange={ event => setDescription(event.target.value)}
          />

          <Section title='Links úteis'>
            {
              links.map( (link, index) => (
                <NoteItem 
                  key={ String(index) }
                  placeholder='Link vazio'
                  value={link}
                  onClick={ () => handleRemoveLink(link) }
                />))
            }
            <NoteItem 
              isNew 
              placeholder='Novo link'
              value={newLink}
              onChange={ event => setNewLink(event.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title='Marcadores'>
            <div className='tags'>
              {
                tags.map( (tag, index) => (
                  <NoteItem 
                    key={ String(index) }
                    placeholder='Tag vazia' 
                    value={tag}
                    onClick={ () => handleRemoveTag(tag) }
                  />))
              }
              <NoteItem 
                isNew 
                placeholder='Nova tag'
                value={newTag} 
                onChange={event => setNewTag(event.target.value)}
                onClick={ handleAddTag }
              />
            </div>
          </Section>

          <Button title='Salvar' onClick={handleNewNote}/>
        </Form>
      </main>
    </Container>
  )
}