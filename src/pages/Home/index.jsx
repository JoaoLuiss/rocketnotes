import { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { ButtonText } from '../../components/ButtonText'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  function handleToggleTags(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);
    if (alreadySelected) {
      setTagsSelected( prevState => prevState.filter( tag => tag !== tagName));
    } else {
      setTagsSelected( prevState => [...prevState, tagName]);
    }
  }

  function handleSelectAllTags() {
    setTagsSelected(tags);
  }

  useEffect( () => {
    async function fetchTags() {
      const response = await api.get('/tags');
      setTags(response.data)
    }

    fetchTags();

  }, [])

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header/>

      <Menu>
        <li>
          <ButtonText 
            title='Todos' 
            onClick={ handleSelectAllTags }
            isActive={ tagsSelected.length === tags.length }
            />
        </li>
        {
          tags && tags.map( tag => (
            <li key={ String(tag.id) }>
              <ButtonText 
                title={tag.name}
                onClick={ () => handleToggleTags(tag.name) }
                isActive={ tagsSelected.includes(tag.name) }
            />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input placeholder='Pesquisar pelo título.' icon={FiSearch}/>
      </Search>

      <Content>
        <Section title={'Minhas notas'}>
          <Note data={
            {
              title: 'React', 
              tags: [
                {id: 1, title: 'react'},
                {id: 2, title: 'Rocketseat'}
              ]
            }}/>
            <Note data={
              {
                title: 'Backend', 
                tags: [
                  {id: 1, title: 'API'}
                ]
              }}/>
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}