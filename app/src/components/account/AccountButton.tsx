import React, { useEffect, useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance, shortenAddress, useLookupAddress } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import Identicon from "./IdentIcon";
import styled from 'styled-components'

type Props = {
    handleOpenModal(): void;
  };

const AccountButton = ({ handleOpenModal } : Props) => {
  const {activateBrowserWallet, account } = useEthers();
  const ens = useLookupAddress()
  const etherBalance = useEtherBalance(account);

  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
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
    <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
    >
    <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px">
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account && (ens ?? shortenAddress(account))}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
      <>
    <Button onClick={handleConnectWallet}
        bg="gray.700"
        color="white"
        borderRadius="xl"
        border="1px solid transparent"
        _hover={{
            borderColor: "blue.400"
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