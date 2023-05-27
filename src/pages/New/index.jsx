import { Link } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { Container, Form } from './styles'
import { useState } from 'react'

export function New() {

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

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

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>
          <Input placeholder='Título'/>

          <TextArea placeholder='Observações' />

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

          <Button title='Salvar' />
        </Form>
      </main>
    </Container>
  )
}