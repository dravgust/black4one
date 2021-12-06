import React from 'react'
import { Container, Section, SectionRow } from '../components/base/base'
import { SendEthForm } from '../components/SendEthForm/SendEthForm'
import { Title } from '../typography/Title'
import DefaultLayout from '../components/layouts/DefaultLayout';

export const SendEtherPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Section>
          <SectionRow>
            <Title style={{color:"white"}}>Send Ether</Title>
          </SectionRow>
          <SendEthForm />
        </Section>
      </Container>
    </DefaultLayout>
  )
}
