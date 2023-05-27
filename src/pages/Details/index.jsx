import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/tags'; 
import { ButtonText } from '../../components/ButtonText';

import { Container, Links, Content } from './styles';

export function Details() {
  return(
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title='Excluir nota' />

          <h1>Introdução ao React</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque soluta saepe maiores voluptatem accusamus facere perspiciatis totam vitae. Rerum non temporibus esse modi ducimus debitis veniam, tempora eveniet minima maxime.</p>

          <Section title='Links úteis'>
            <Links>
              <li><a href="#">https://www.rocketseat.com.br/</a></li>
              <li><a href="#">https://www.rocketseat.com.br/</a></li>
            </Links>
          </Section>

          <Section title='Marcadores'>
            <Tag title='express'/>
            <Tag title='node'/>
            </Section>
          
          <Button title='Voltar' />
        </Content>
      </main>
    </Container>
  )
}