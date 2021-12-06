import React from 'react'
import styled from 'styled-components'
import { TokenList } from '../components/TokenList/TokenList'
import { Title } from '../typography/Title'
import { Container, ContentBlock, Section, SectionRow } from '../components/base/base'
import DefaultLayout from '../components/layouts/DefaultLayout';

export function Tokens() {
  return (
    <DefaultLayout>
      <Container>
        <Section>
          <SectionRow>
            <Title style={{color:"white"}}>Tokens</Title>
          </SectionRow>
          <TokensContentBlock>
            <TokenList />
          </TokensContentBlock>
        </Section>
      </Container>
    </DefaultLayout>
  )
}

const TokensContentBlock = styled(ContentBlock)`
  padding: 16px 32px;
`
