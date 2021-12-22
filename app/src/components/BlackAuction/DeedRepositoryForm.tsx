import React, { useState, useEffect } from "react"
import { useEthers, useContractFunction } from '@usedapp/core'
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik"
import {
  chakra, FormLabel, FormErrorMessage, FormControl, Input, InputLeftAddon, InputGroup, Button, useColorModeValue, Stack, SimpleGrid, GridItem,
  Textarea, FormHelperText, Flex, Icon, VisuallyHidden, Text, Box
} from '@chakra-ui/react';
import Config from '../../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { isURI } from "../../utils";
//import { TokenMetadata } from "../../models/DeedRepository";
//import { create } from 'ipfs-http-client'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

interface FormValues {
  tokenURI: string
}

/*const client = create({
  url: 'https://ipfs.infura.io:5001/api/v0'
})*/

export const DeedRepositoryForm = () => {

  const gray700 = useColorModeValue("white", "gray.700")
  const gray700gray50 = useColorModeValue("gray.700", "gray.50")
  const gray50gray800 = useColorModeValue("gray.50", "gray.800")
  const gray500gray50 = useColorModeValue("gray.500", "gay.50")
  const gray300gray500 = useColorModeValue("gray.300", "gray.500")
  const gray400gray500 = useColorModeValue("gray.400", "gray.500")
  const gray600gray200 = useColorModeValue("brand.600", "brand.200")
  const gray400gray300 = useColorModeValue("gray.400", "gray.300")
  const gray600gray400 = useColorModeValue("gray.600", "gray.400")
  const gray500gray900 = useColorModeValue("gray.50", "gray.900")

  const { account } = useEthers()
  const [disabled, setDisabled] = useState(false)
  const formikRef = React.createRef<FormikHelpers<FormValues>>()
  
  const { state, send } = useContractFunction(contract, 'registerDeed', { transactionName: 'Register Deed' });

  const onSubmit = async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    console.log("[DeedRepositoryForm] valus: ", values)

    //const metadata = new TokenMetadata("TOKEN#1", "auction asset", values.tokenURI)

    setDisabled(true)
    send(values.tokenURI, { from: account })
    setSubmitting(false)
  }

  useEffect(() => {
    console.log("[DeedRepositoryForm] state: ", state);
    if (state.status != 'Mining') {
      formikRef.current?.resetForm();
      setDisabled(false)
    }
  }, [state])

  return (
    <Formik
      initialValues={{ tokenURI: '' }}
      onSubmit={onSubmit}
      ref={formikRef}
    >
      {(props) => (
        <Form>
          <Stack
            px={4}
            py={5}
            bg={gray700}
            spacing={6}
            p={{ sm: 6 }}
            roundedTop={"xl"}
          >
            <SimpleGrid columns={3} spacing={6}>
              <Field name='tokenURI' validate={isURI}>
                {({ field, form }: FieldProps<string>) => (
                  <FormControl as={GridItem} colSpan={[3, 3]} isInvalid={(form.errors.tokenURI && form.touched.tokenURI) as boolean}>
                    <FormLabel
                      htmlFor='tokenURI'
                      fontSize="sm"
                      fontWeight="md"
                      color={gray700gray50}
                    >
                      URI
                    </FormLabel>
                    <InputGroup >
                      <InputLeftAddon
                        bg={gray50gray800}
                        color={gray500gray50}
                        rounded="xl">
                          http://
                      </InputLeftAddon>
                      <Input
                        id="tokenURI"
                        type="url"
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="xl"
                        {...field}
                      />
                    </InputGroup>
                    <FormErrorMessage mt={2} textAlign={'center'}>{form.errors.tokenURI}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>

            <div>
              <FormControl id="email" mt={1}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={gray700gray50}
                >
                  About
                </FormLabel>
                <Textarea
                  placeholder="you@example.com"
                  mt={1}
                  rows={3}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{ sm: "sm" }}
                />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </div>


            <FormControl>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={gray700gray50}
              >
                Cover photo
              </FormLabel>
              <Flex
                mt={1}
                justify="center"
                px={6}
                pt={5}
                pb={6}
                borderWidth={2}
                borderColor={gray300gray500}
                borderStyle="dashed"
                rounded="md"
              >
                <Stack spacing={1} textAlign="center">
                  <Icon
                    mx="auto"
                    boxSize={12}
                    color={gray400gray500}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  <Flex
                    fontSize="sm"
                    color={gray600gray400}
                    alignItems="baseline"
                  >
                    <chakra.label
                      htmlFor="file-upload"
                      cursor="pointer"
                      rounded="md"
                      fontSize="md"
                      color={gray600gray200}
                      pos="relative"
                      _hover={{
                        color: gray400gray300,
                      }}
                    >
                      <span>Upload a file</span>
                      <VisuallyHidden>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                        />
                      </VisuallyHidden>
                    </chakra.label>
                    <Text pl={1}>or drag and drop</Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color={gray500gray50}
                  >
                    PNG, JPG, GIF up to 10MB
                  </Text>
                </Stack>
              </Flex>
            </FormControl>
          </Stack>
          <Box
            px={{ base: 4, sm: 6 }}
            py={3}
            bg={gray500gray900}
            textAlign="right"
            roundedBottom={"xl"}
          >
            <FormControl w={{ base: '100%', md: '100%' }}>
              <Button colorScheme='blue' isLoading={props.isSubmitting} type='submit' disabled={!account || disabled}>
                Submit
              </Button>
            </FormControl>
          </Box>
        </Form>
      )}
    </Formik>

  )
}