import React, { useEffect, useState } from "react";
import { Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useEthers, useEtherBalance, shortenAddress, useLookupAddress, ChainId as ChainNames } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import Identicon from "./IdentIcon";
import styled from 'styled-components'

type Props = {
  handleOpenModal(): void;
};

const AccountButton = ({ handleOpenModal }: Props) => {
  const { activateBrowserWallet, account, error, chainId } = useEthers();
  const ens = useLookupAddress()
  const etherBalance = useEtherBalance(account);

  const [activateError, setActivateError] = useState('')

  const bg700 = useColorModeValue('gray.200', 'gray.700')
  const bg800 = useColorModeValue('gray.300', 'gray.800')

  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const handleConnectWallet = () => {
    setActivateError('');
    activateBrowserWallet();
  }

  return account ? (
    <>
      {chainId &&
        <Box display="flex"
          alignItems="center"
          background={bg700}
          borderRadius="xl"
          py="0">
          <Text fontSize="md" px="3">{ChainNames[chainId]}</Text>
        </Box>
      }
      <Box
        display="flex"
        alignItems="center"
        background={bg700}
        borderRadius="xl"
        py="0"
      >
        <Box px="3">
          <Text fontSize="md" whiteSpace="nowrap">
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
          </Text>
        </Box>
        <Button
          onClick={handleOpenModal}
          bg={bg800}
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "whiteAlpha.700",
            backgroundColor: { bg700 },
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px">
          <Text fontSize="md" fontWeight="medium" mr="2">
            {account && (ens ?? shortenAddress(account))}
          </Text>
          <Identicon />
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Button onClick={handleConnectWallet}
        bg={bg700}
        rounded={'xl'}
        border="1px solid transparent"
        _hover={{
          textDecoration: 'none',
          borderColor: "whiteAlpha.700"
        }}>
        Connect to a wallet
      </Button>
      <ErrorWrapper>{activateError}</ErrorWrapper>
    </>
  );
}

export default AccountButton;

const ErrorWrapper = styled.div`
  color: #ff3960;
  overflow: auto;
`