'use client'

import React, { useEffect, useState } from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  useToast
} from '@chakra-ui/react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
  useChakraSelectProps
} from "chakra-react-select";
import moment from 'moment';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@chakra-ui/icons'


const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'white')} rounded={6} p={6}>
      <Box>
        <Content/>
      </Box>
      <Box>

      </Box>
    </Box>
  )
}

const Content = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) {
      const teacherId = searchParams?.get('id');
      if(teacherId) {
        getSchedules(teacherId);
      }
    }
  }, [isLoaded]);
  
  const getSchedules = async (teacherId) => {
    const data = await fetch('/api/teacher-schedules/get', {
      method: "POST",
      body: JSON.stringify({
        teacher_id: teacherId
      })
    });
    const result = await data.json();
    console.log('data => ', result);
    if(result?.length) {
      setData(result);
      return;
    }
    //push('/');
  };

  if(!isLoaded && !data?.length) return <h1>Loading...</h1>;
  
  if(isLoaded && !data?.length) {
    return <InvalidDetails />
  }

  return(
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Hello! {data[0].teacher_name}
      </Heading>
      <Text color={'gray.500'}>Your schedules</Text>
      <Container maxW='6xl' centerContent mt={6}>
        <TableContainer widht={"full"}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Time</Th>
                <Th>Week</Th>
                <Th>Room</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item, idx) => {
                return <Tr>
                <Td>{item.subject_name}</Td>
                <Td>{item.start_time} - {item.end_time}</Td>
                <Td>{item.week}</Td>
                <Td>{item.room}</Td>
              </Tr>
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

const InvalidDetails = () => {
  const router = useRouter();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button
        onClick={() => router.push('/')}
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button>
    </Box>
  )
}

export default SidebarWithHeader
