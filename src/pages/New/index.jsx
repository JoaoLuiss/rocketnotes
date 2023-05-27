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

  function handleAddLink() {
    setLinks( (prevState) => [...prevState, newLink]);
    setNewLink('');
  }

  function handleRemoveLink(linkToBeDeleted) {
    setLinks( prevState => prevState.filter( link => link !== linkToBeDeleted) );
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
              <NoteItem value='React' />
              <NoteItem isNew placeholder='Nova tag'/>
            </div>
          </Section>

          <Button title='Salvar' />
        </Form>
      </main>
    </Container>
  )
}