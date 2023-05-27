import { FiPlus, FiSearch } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { ButtonText } from '../../components/ButtonText'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

export function Home() {
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header/>

      <Menu>
        <li><ButtonText title='Todos' isActive /></li>
        <li><ButtonText title='React'/></li>
        <li><ButtonText title='Nodejs'/></li>
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