import React from 'react'
import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
import DefaultLayout from '../components/layouts/DefaultLayout';

export function Block() {
  const blockNumber = useBlockNumber()
  const { chainId } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  return (
    <DefaultLayout>
      <Container>
        <Section>
          <SectionRow>
            <Title style={{ color: "white" }}>Balance</Title>
          </SectionRow>
          <ContentBlock>
            <ContentRow>
              <Label>Chain id:</Label> <TextInline>{chainId}</TextInline>
            </ContentRow>
            <ContentRow>
              <Label>Current block:</Label> <TextInline>{blockNumber}</TextInline>
            </ContentRow>
            {difficulty && (
              <ContentRow>
                <Label>Current difficulty:</Label> <TextInline>{difficulty.toString()}</TextInline>
              </ContentRow>
            )}
            {timestamp && (
              <ContentRow>
                <Label>Current block timestamp:</Label> <TextInline>{timestamp.toLocaleString()}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </DefaultLayout>
  )
}