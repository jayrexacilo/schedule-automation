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
  Stack
} from '@chakra-ui/react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'



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
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const get = await fetch('/api/teachers/get', {
      method: 'GET'
    });
    const data = await get.json();
    console.log('get => ', data);
    if(data?.length) {
      setData(data);
      return;
    }
    setData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('e => ', e);
    console.log('form data => ', formData.get(''));
    const add = await fetch('/api/teachers/add', {
      method: "POST",
      body: JSON.stringify({
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
      })
    });
    console.log('add => ', add);
    e.target.reset();
    getData();
  };

  const handleDelete = async (id) => {
    const remove = await fetch('/api/teachers/delete', {
      method: "POST",
      body: JSON.stringify({
        id,
      })
    });
    getData();
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1}>
        <Stack spacing={4} w={'full'} maxW={'md'} as="form" onSubmit={handleSubmit}>
          <Heading fontSize={'2xl'}>Add Teacher</Heading>
            <FormControl id="code">
              <FormLabel>Firstname</FormLabel>
              <Input type="text" name="firstname"/>
            </FormControl>
            <FormControl>
              <FormLabel>Lastname</FormLabel>
              <Input type="text" name="lastname"/>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'} type="submit">
                Submit
              </Button>
            </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <TableContainer>
          <Heading>Teachers</Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(item => <Tr>
                <Td>{item.firstname}</Td>
                <Td>{item.lastname}</Td>
                <Td><Button colorScheme="red" onClick={() => handleDelete(item.id)}>Delete</Button></Td>
              </Tr>)}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Stack>
  )
};

export default SidebarWithHeader
