import React from "react";
import { Container, ContentBlock, ContentRow, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
import DefaultLayout from '../components/layouts/DefaultLayout';
import { formatEther } from '@ethersproject/units';
import { useEtherBalance, useEthers } from '@usedapp/core';

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

const Balance = () => {

    const { account } = useEthers()
    const userBalance = useEtherBalance(account)
    const stakingBalance = useEtherBalance(STAKING_CONTRACT)

    return (
        <DefaultLayout>
            <Container>
                <Section>
                    <SectionRow>
                        <Title style={{color:"white"}}>Balance</Title>
                    </SectionRow>
                    <ContentBlock>
                        {stakingBalance && (
                            <ContentRow>
                                <Label>ETH2 staking contract holds:</Label> <TextInline>{formatEther(stakingBalance)}</TextInline>{' '}
                                <Label>ETH</Label>
                            </ContentRow>
                        )}
                        {account && (
                            <ContentRow>
                                <Label>Account:</Label> <TextInline>{account}</TextInline>
                            </ContentRow>
                        )}
                        {userBalance && (
                            <ContentRow>
                                <Label>Ether balance:</Label> <TextInline>{formatEther(userBalance)}</TextInline> <Label>ETH</Label>
                            </ContentRow>
                        )}
                    </ContentBlock>
                </Section>
            </Container>
        </DefaultLayout>
    )
}

export default Balance;