import React, { useState, useEffect } from "react"
import { useEthers, useContractFunction } from '@usedapp/core'
import { Formik, Form, Field, FieldProps } from "formik"
import { FormLabel, FormErrorMessage, Stack, FormControl, Input, Button, useColorModeValue, Heading, Container, Flex, Spacer } from '@chakra-ui/react';
import Config from '../../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

export const DeedRepositoryForm = () => {

  //const bg700 = useColorModeValue('gray.300', 'gray.700')
  const bg600 = useColorModeValue('gray.100', 'gray.600')

  const { account } = useEthers()
  const [tokenURI, setTokenURI] = useState('')
  const [disabled, setDisabled] = useState(false)

  const { state, send } = useContractFunction(contract, 'registerDeed', { transactionName: 'Register Deed' });

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'test') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  useEffect(() => {
    if (state.status != 'Mining') {
      setDisabled(false)
      setTokenURI('')
    }
  }, [state])

  return (

    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')} direction={'column'} pt={10}>
      <Container maxW={'lg'} bg={useColorModeValue('white', 'whiteAlpha.100')} boxShadow={'xl'} rounded={'lg'} p={6} direction={'column'}>
        <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} textAlign={'center'} mb={5}>
          Subscribe to our Newsletter
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
          <Formik
            initialValues={{ tokenURI: '' }}
            onSubmit={(values, actions) => {

              console.log("values", values)
              console.log("actions", actions)

              if (tokenURI == 'http://') {
                setDisabled(true)
                send(tokenURI, { from: account })
              }

              actions.setSubmitting(false)
            }}
          >
            {(props) => (
              <Form>
                <Field name='tokenURI' validate={validateName}>
                  {({ field, form }: FieldProps<string>) => (
                    <FormControl isInvalid={(form.errors.tokenURI && form.touched.tokenURI) as boolean}>
                      <FormLabel htmlFor='tokenURI'>tokenURI</FormLabel>
                      <Input variant={'solid'} bg={bg600} color={'gray.800'}  {...field}
                        id='tokenURI'
                        placeholder='http://'
                        aria-label={'http://'}
                        _placeholder={{
                          color: 'gray.400',
                        }} />
                      <FormErrorMessage mt={2} textAlign={'center'}>{form.errors.tokenURI}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <FormControl w={{ base: '100%', md: '40%' }}>
                  <Button mt={2} w="100%" colorScheme='blue' isLoading={props.isSubmitting} type='submit' disabled={!account || disabled}>
                    Submit
                  </Button>
                </FormControl>

              </Form>
            )}
          </Formik>
        </Stack>

      </Container>
      <Spacer />
    </Flex>
  )
}