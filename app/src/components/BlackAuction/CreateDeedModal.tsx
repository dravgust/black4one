import React from "react";
import { ModalProps } from "../../models/types";
import {
    Modal,
    ModalOverlay,
    useColorModeValue,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box
} from "@chakra-ui/react"
import { CreateDeedForm } from "./CreateDeedForm";

const CreateDeedModal = ({ isOpen, onClose }: ModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent
                background={useColorModeValue('gray.400', 'gray.900')}
                border="1px"
                borderStyle="solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                borderRadius="3xl"
            >
                <ModalHeader px={4} fontSize="lg" fontWeight="medium">
                    Create Deed
                </ModalHeader>
                <ModalCloseButton
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody pt={0} px={4}>
                    <Box
                        borderRadius="3xl"
                        border="1px"
                        borderStyle="solid"
                        borderColor={useColorModeValue('gray.100', 'gray.600')}
                        px={5}
                        pt={4}
                        pb={2}
                        mb={3}
                    >
                        <CreateDeedForm />
                    </Box>
                </ModalBody>
                {/*<ModalFooter
                    justifyContent="end"
                    background={useColorModeValue('gray.200', 'gray.700')}
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl"
                    p={6}
                >
                </ModalFooter>*/}
            </ModalContent>
        </Modal>
    )
}

export default CreateDeedModal;
