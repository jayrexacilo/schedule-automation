'use client'

import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from "axios";


export default function SimpleCard() {
  const toast = useToast();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };


    try {
      const result = await axios.post("/api/auth/login", payload);

      // redirect the user to /dashboard
      setTimeout(() => {
        push("/admin/dashboard/schedules");
      }, 2000);
    } catch (error) {
      console.log('result error => ', error);
      setIsLoading(false);
      toast({
        title: "Invalid credentials.",
        status: 'error',
        isClosable: true,
        position: 'top'
      })
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} as="form" onSubmit={handleSubmit}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" disabled={isLoading}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" disabled={isLoading}/>
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={isLoading}
                loadingText="Submitting..."
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
