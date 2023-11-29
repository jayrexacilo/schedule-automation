'use client'

import {
  Box,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'


const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      Dashboard
    </Box>
  )
}

export default SidebarWithHeader
