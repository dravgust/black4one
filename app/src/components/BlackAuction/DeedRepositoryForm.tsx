import React, { useState, useEffect, useRef } from "react"
import { useEthers, useContractFunction } from '@usedapp/core'
import { Form, Field, FieldProps, FormikHelpers } from "formik"
import FormikWithRef from "../FormikWithRef"
import {
  chakra, FormLabel, FormErrorMessage, FormControl, Input, InputLeftAddon, InputGroup, Button, useColorModeValue, Stack, SimpleGrid, GridItem,
  Textarea, FormHelperText, Flex, Icon, VisuallyHidden, Text, Box
} from '@chakra-ui/react';
import Config from '../../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { isURI, ensureIpfsUriPrefix } from "../../utils";
import { TokenMetadata } from "../../models/DeedRepository";
import { create } from 'ipfs-http-client'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

interface FormValues {
  tokenURI: string
}

interface TokenOptions {
  path?: string,
  name: string,
  description: string,
  owner?: string | null | undefined
}

const nftClient = create({
  url: 'https://ipfs.infura.io:5001/api/v0'
})


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
  const [file, setFile] = useState<File | null>(null)
  const formikRef = useRef<FormikHelpers<FormValues>>()
  
  const { state, send } = useContractFunction(contract, 'registerDeed', { transactionName: 'Register Deed' });

  const createNFTFromAssetData = async (content: File, options: TokenOptions) => {
    const filePath = options.path || 'asset.bin'
    const basename = filePath.replace(/^.*(\\|\/|\:)/, '')

    const ipfsPath = '/nft/' + filePath
    const { cid: assetCid } = await nftClient.add({path: ipfsPath, content })

    const assetURI = ensureIpfsUriPrefix(assetCid) + '/' + basename
    const metadata = new TokenMetadata(options.name, options.description, assetURI)

    const { cid: metadataCid } = await nftClient.add({
      path: '/nft/metadata.json',
      content: JSON.stringify(metadata)
    })
    const metadataURI = ensureIpfsUriPrefix(metadataCid) + '/metadata.json'

    let ownerAddress = options.owner
    if(!ownerAddress){
      ownerAddress = account
    }

    return {
      assetURI,
      metadataURI
    }
  }

  const onSubmit = async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    console.log("[DeedRepositoryForm] valus: ", values)

    if(file != null) {
      const { assetURI, metadataURI } = await createNFTFromAssetData(file, { path: "/token#1.jpg", name: "TOKEN#1", description: "auction asset" })
      console.log("assetURI", assetURI)
      console.log("metadataURI", metadataURI)

      send(metadataURI, { from: account })  

      setDisabled(true)       
    }

    setSubmitting(false)
  }

  const retrieveFile = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    console.log("files", files)
    if(files != null){
      const file = files[0];
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        setFile(file)
      }
    }
  }

  useEffect(() => {
    console.log("[DeedRepositoryForm] state: ", state);
    if (state.status != 'Mining') {
      formikRef.current?.resetForm();
      setDisabled(false)
    }
  }, [state])

  return (
    <FormikWithRef
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
                          onChange={retrieveFile}
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
    </FormikWithRef>

  )
}