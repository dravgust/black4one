import React, { useState, useEffect, useRef } from "react"
import { useEthers, useContractFunction } from '@usedapp/core'
import { Form, Field, FieldProps, FormikHelpers } from "formik"
import FormikWithRef from "../FormikWithRef"
import {
  chakra, FormLabel, FormErrorMessage, FormControl, Input, Button, useColorModeValue, Stack, SimpleGrid, GridItem,
  Textarea, FormHelperText, Flex, Icon, VisuallyHidden, Text, Box
} from '@chakra-ui/react';
import Config from '../../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { ensureIpfsUriPrefix, stripIpfsUriPrefix, toHttpPath } from "../../utils";
import { DeedMetadata } from "../../models/DeedRepository";
import { create } from 'ipfs-http-client'
import * as yup from "yup";
import { ModalProps } from "../../models/types";

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

interface FormValues {
  tokenName: string
  tokenDescription: string
  tokenFile: string
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


export const CreateDeedForm = ({isOpen, onClose}: ModalProps) => {

  const gray700gray50 = useColorModeValue("gray.700", "gray.50")
  const gray500gray50 = useColorModeValue("gray.500", "gay.50")
  const gray200gray700 = useColorModeValue('gray.200', 'gray.700')
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

  /*const mintToken = async (ownerAddress: string, metadataURI: string) => {
    metadataURI = stripIpfsUriPrefix(metadataURI)
    const tx = await contract.registerDeed(metadataURI, { from: ownerAddress })
    const receit = await tx.wait()
    for(const event of receit.events) {
      if(event.event !== 'DeedRegistered') {
        console.log('ignoring unknown event type ', event.event)
        continue
      }
      return event.args.tokenId.toString()
    }

    throw new Error('unable to get token id')
  }

  const defaultOwnerAddress = () : string => {

    if(!account){
      throw new Error("account is not provided")
    }
    return account
  }*/

  const createNFTFromAssetData = async (content: File, options: TokenOptions) => {
    const filePath = options.path || 'asset.bin'
    const basename = encodeURIComponent(filePath.replace(/^.*(\\|\/|\:)/, ''))

    const ipfsPath = '/nft/' + filePath
    const { cid: assetCid } = await nftClient.add({ path: ipfsPath, content })

    const assetURI = ensureIpfsUriPrefix(assetCid) + '/' + basename
    const metadata = new DeedMetadata(options.name, options.description, assetURI)

    const { cid: metadataCid } = await nftClient.add({
      path: '/nft/metadata.json',
      content: JSON.stringify(metadata)
    })
    const metadataURI = ensureIpfsUriPrefix(metadataCid) + '/metadata.json'

    //let ownerAddress = options.owner
    //if(!ownerAddress){
    // ownerAddress = defaultOwnerAddress()
    //}

    //const tokenId = await mintToken(ownerAddress, metadataURI)

    return {
      //tokenId,
      metadata,
      assetURI,
      metadataURI,
      ssetGatewayURL: toHttpPath(assetURI),
      metadataGatewayURL: toHttpPath(metadataURI),
    }
  }

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log("[DeedRepositoryForm] values: ", values)
    console.log("[DeedRepositoryForm] file: ", file)
    console.log("[DeedRepositoryForm] account: ", account)
    if (file != null && account != null) {
      const { assetURI, metadataURI, ssetGatewayURL, metadataGatewayURL } = await createNFTFromAssetData(file, {
        path: file.name,
        name: values.tokenName,
        description: values.tokenDescription,
        owner: account
      })

      console.log("assetURI", assetURI)
      console.log("metadataURI", metadataURI)
      console.log("ssetGatewayURL", ssetGatewayURL)
      console.log("metadataGatewayURL", metadataGatewayURL)

      send(stripIpfsUriPrefix(metadataURI), { from: account })

      setDisabled(true)
    }

    setSubmitting(false)
  }

  const retrieveFile = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    console.log("files", files)
    if (files != null) {
      const file = files[0];
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        setFile(file)
        formikRef.current?.setFieldValue("tokenFile", file);
      }
    }
  }

  useEffect(() => {
    console.log("[DeedRepositoryForm] state: ", state);
    if (state.status != 'Mining') {
      formikRef.current?.resetForm();
      setDisabled(false)

      console.log("isOpen", isOpen)
      console.log("onClose", onClose)
    }
  }, [state])

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
  ];
  const validationSchema = yup.object().shape({
    tokenName: yup.string().required("A name is required"),
    tokenDescription: yup.string().required("A description is required"),
    tokenFile: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      )
  });

  return (
    <FormikWithRef
      initialValues={{ tokenName: '', tokenDescription: '', tokenFile: null }}
      onSubmit={onSubmit}
      ref={formikRef}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          <Stack>
            <SimpleGrid columns={3} spacing={6}>
              <Field name='tokenName'>
                {({ field, form }: FieldProps<string>) => (
                  <FormControl as={GridItem} colSpan={3} isInvalid={(form.errors.tokenName && form.touched.tokenName) as boolean}>
                    <FormLabel
                      htmlFor='tokenName'
                      fontSize="sm"
                      fontWeight="md"
                      color={gray700gray50}
                    >
                      Name
                    </FormLabel>
                    <Input
                      id="tokenName"
                      type="text"
                      placeholder="Identifies the asset to which this NFT represents"
                      focusBorderColor="brand.400"
                      rounded="xl"
                      {...field}
                    />
                    <FormErrorMessage mt={2} textAlign={'center'}>{form.errors.tokenName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>

            <Field name='tokenDescription'>
              {({ field, form }: FieldProps<string>) => (
                <FormControl mt={1} isInvalid={(form.errors.tokenDescription && form.touched.tokenDescription) as boolean}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={gray700gray50}
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    id="tokenDescription"
                    placeholder="Describes the asset to which this NFT represents"
                    mt={1}
                    rows={3}
                    shadow="sm"
                    focusBorderColor="brand.400"
                    fontSize={{ sm: "sm" }}
                    minH={120}
                    rounded="xl"
                    {...field}
                  />
                  <FormErrorMessage mt={2} textAlign={'center'}>{form.errors.tokenDescription}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='tokenFile'>
              {({ form }: FieldProps<string>) => (
                <FormControl isInvalid={(form.errors.tokenFile && form.touched.tokenFile) as boolean}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={gray700gray50}
                  >
                    Image
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
                    rounded="xl"
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
                          htmlFor="tokenFile"
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
                              id="tokenFile"
                              name="tokenFile"
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
                  <FormErrorMessage mt={2} textAlign={'center'}>{form.errors.tokenFile}</FormErrorMessage>
                  <FormHelperText>
                    * Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Box
            //px={{ base: 4, sm: 6 }}
            py={3}
            bg={gray500gray900}
            textAlign="right"
            roundedBottom={"xl"}
          >
            <FormControl w={{ base: '100%', md: '100%' }}>
              <Button bg={gray200gray700}
                rounded={'xl'}
                border="1px solid transparent"
                _hover={{
                  borderColor: "whiteAlpha.700"
                }} isLoading={props.isSubmitting} type='submit' disabled={!account || disabled}>
                Create
              </Button>
            </FormControl>
          </Box>
        </Form>
      )}
    </FormikWithRef>

  )
}