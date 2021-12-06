import React from 'react'
import styled from 'styled-components'
import { Container, Section, SectionRow } from '../components/base/base'
import { DepositEth, WithdrawEth } from '../components/Transactions/Forms'
import { Title } from '../typography/Title'
import DefaultLayout from '../components/layouts/DefaultLayout';

export function Transactions() {
  return (
    <DefaultLayout>
      <Container>
        <Section>
          <SectionRow>
          <Title>Tokens</Title>
          </SectionRow>
          <TableGrid>
            <DepositEth />
            <WithdrawEth />
          </TableGrid>
        </Section>
      </Container>
    </DefaultLayout>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
