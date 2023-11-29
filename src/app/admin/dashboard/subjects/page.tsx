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
  Checkbox,
  CheckboxGroup
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
  const [subjects, setSubjects] = useState(null);
  const [week, setWeek] = useState();

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const get = await fetch('/api/subjects/get-subjects', {
      method: 'GET'
    });
    const data = await get.json();
    console.log('get => ', data);
    if(data?.length) {
      setSubjects(data);
      return;
    }
    setSubjects(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('e => ', e);
    console.log('form data => ', formData.get('week'));
    console.log('week => ', week?.join(', '));
    return;
    const add = await fetch('/api/subjects/add-subject', {
      method: "POST",
      body: JSON.stringify({
        label: formData.get('label'),
        subject_code: formData.get('subject_code'),
        time_allocation: formData.get('time_allocation'),
        week: week?.join(', ')
      })
    });
    console.log('add => ', add);
    e.target.reset();
    getSubjects();
  };

  const handleDelete = async (id) => {
    const remove = await fetch('/api/subjects/delete-subject', {
      method: "POST",
      body: JSON.stringify({
        id,
      })
    });
    getSubjects();
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1}>
        <Stack spacing={4} w={'full'} maxW={'md'} as="form" onSubmit={handleSubmit}>
          <Heading fontSize={'2xl'}>Add Subject</Heading>
            <FormControl id="code">
              <FormLabel>Code</FormLabel>
              <Input type="text" name="subject_code"/>
            </FormControl>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input type="text" name="label"/>
            </FormControl>
            <FormControl>
              <FormLabel>Time Allocation</FormLabel>
              <Input type="text" name="time_allocation"/>
            </FormControl>
          <CheckboxGroup defaultValue={[]}
            onChange={value => {
              console.log('week value => ', value)
              setWeek(value)
            }}>
              <Stack spacing={[1, 5]} direction={['column', 'row']}>
                <Checkbox value='monday'>Monday</Checkbox>
                <Checkbox value='tuesday'>Tuesday</Checkbox>
                <Checkbox value='wednesday'>Wednesday</Checkbox>
                <Checkbox value='thursday'>Thursday</Checkbox>
                <Checkbox value='friday'>Friday</Checkbox>
                <Checkbox value='saturday'>Saturday</Checkbox>
              </Stack>
            </CheckboxGroup>
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
          <Heading>Subjects</Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Th>Label</Th>
                <Th isNumeric>Time Allocation</Th>
                <Th>Week</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subjects?.map(item => <Tr>
                <Td>{item.subject_code}</Td>
                <Td>{item.label}</Td>
                <Td isNumeric>{item.time_allocation}</Td>
                <Td>{item.week}</Td>
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
