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
  const toast = useToast();
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(2);
  const [isClient, setIsClient] = useState(false);
  const selectTeacherProps = useChakraSelectProps({
    //isMulti: true,
    value: selectedTeacher,
    onChange: setSelectedTeacher,
  });
  const selectSubjectProps = useChakraSelectProps({
    //isMulti: true,
    value: selectedSubject,
    onChange: setSelectedSubject,
  });

  useEffect(() => {
    getTeachers();
    getSubjects();
    setIsClient(true)
  }, []);

  const getTeachers = async () => {
    const get = await fetch('/api/teachers/get', {
      method: 'GET'
    });
    const data = await get.json();
    console.log('get => ', data);
    if(data?.length) {
      setTeachers(data);
      return;
    }
    setTeachers([]);
  };

  const getSubjects = async () => {
    const get = await fetch('/api/subjects/get-subjects', {
      method: 'GET'
    });
    const data = await get.json();
    console.log('get subjects => ', data);
    if(data?.length) {
      setSubjects(data);
      return;
    }
    setSubjects([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e => ', e);
    //const add = await fetch('/api/teachers/add', {
    //  method: "POST",
    //  body: JSON.stringify({
    //    firstname: formData.get('firstname'),
    //    lastname: formData.get('lastname'),
    //  })
    //});
    //console.log('add => ', add);
    if(data.filter(i => i.subject.value === selectedSubject.value)?.length) {
      toast({
          title: 'Subject already added.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
      return;
    }
    if(selectedTeacher && selectedSubject) {
      let newData = data?.length ? data : [];
      newData.push({
        teacher: selectedTeacher,
        subject: selectedSubject,
      });
      console.log('submit data new Data => ', newData);
      setData(newData);
      setSelectedSubject(null);
      setSelectedTeacher(null);
      setForceUpdate(Math.random() * 100);
      return;
    }
    toast({
        title: 'Please check your input.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
  };

  const handleDelete = async (id) => {
    setData(data.filter((item, idx) => idx !== id));
  };

  const handleGenerate = () => {
    console.log('data => ', data);
    console.log('teachers => ', teachers);
    console.log('subject => ', subjects);
    let schedules = [];
    const _selectedSubjects = data.map(i => i.subject.value);
    const _subjects = subjects.filter(i => _selectedSubjects.includes(i.id))
    console.log('_subjects => ', _subjects);
    let time = moment().set('hour', 7).set('minutes', 0);
    let totalTime = 0;
    _subjects.map(i => {
      const getAssignedTeacher = data.filter(i2 => {
        return i2.subject.value === i.id;
      })
      console.log('ass teach => ', getAssignedTeacher);
      console.log('i subjects => ', i);
      if(totalTime >= 5) {
        time = moment(time).add(1, 'h');
        schedules.push({
          isBreak: true,
          subject: i.label,
          startTime: moment(time).subtract(1, 'h').format('hh:mm a'),
          endTime: moment(time).format('hh:mm a'),
          week: i.week,
          assignedTeacher: getAssignedTeacher[0].teacher.label
        });
      }
      let startTime = time;
      let endTime = moment(startTime).add(i.time_allocation, 'h');
      totalTime += i.time_allocation;
      console.log('time A=> ', startTime.format('hh:mm a'));
      console.log('time A=>2 ', endTime.format('hh:mm a'));
      schedules.push({
        subject: i.label,
        startTime: moment(startTime).format('hh:mm a'),
        endTime: moment(endTime).format('hh:mm a'),
        week: i.week,
        assignedTeacher: getAssignedTeacher[0].teacher.label
      });
      time = endTime;
      console.log('time => ', time.format('hh:mm a'));
    });
    console.log('schedules => ', schedules);
    setSchedules(schedules);
    //getSubjects();
  };

  console.log('teachers => ', teachers);
  console.log('subjects => ', subjects);
  console.log('data => ', data);
  console.log('selectedSubject => ', selectedSubject);
  console.log('selectedTeacher => ', selectedTeacher);

  if(!isClient) return null;

  return (
    <Box>
      <Stack direction={{ base: 'column', md: 'row' }} mb={8}>
        <Flex p={8} flex={1}>
          <Stack spacing={4} w={'full'} maxW={'md'} as="form" onSubmit={handleSubmit}>
            <Heading fontSize={'2xl'}>Add Subject</Heading>
              <FormControl id="code">
                <FormLabel>Subject</FormLabel>
                <Select
                  {...selectSubjectProps}
                  options={subjects.map(i => ({label: i.subject_code +' - '+i.label, value: i.id}))}
                  //name="subject"
                  //onChange={value => setSelectedSubject(value)}
                  //value={selectedSubject?.value || ''}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Teacher</FormLabel>
                <Select
                  {...selectTeacherProps}
                  options={teachers.map(i => ({label: i.firstname+' - '+i.lastname, value: i.id}))}
                  //name="teachers"
                  //onChange={value => setSelectedTeacher(value)}
                  //value={selectedTeacher?.value || ''}
                />
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
            <Heading>Subjects</Heading>
            <Button className="mt-4 mb-2" onClick={handleGenerate}>Generate</Button>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Subject</Th>
                  <Th>Assigned Teacher</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item, idx) => <Tr>
                  <Td>{item.subject.label}</Td>
                  <Td>{item.teacher.label}</Td>
                  <Td><Button colorScheme="red" onClick={() => handleDelete(idx)}>Delete</Button></Td>
                </Tr>)}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Stack>
      <Box width={"full"}>
        <TableContainer>
          <Heading>Schedule</Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Time</Th>
                <Th>Week</Th>
                <Th>Assigned Teacher</Th>
                <Th>Room</Th>
              </Tr>
            </Thead>
            <Tbody>
              {schedules?.map((item, idx) => {
                if(item.isBreak) {
                  return <Tr>
                  <Td>Break</Td>
                  <Td>{item.startTime} - {item.endTime}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                }
                return <Tr>
                <Td>{item.subject}</Td>
                <Td>{item.startTime} - {item.endTime}</Td>
                <Td>{item.week}</Td>
                <Td>{item.assignedTeacher}</Td>
                <Td>ROOM10{idx}</Td>
              </Tr>
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
};

export default SidebarWithHeader
