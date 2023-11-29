import { ChakraProvider } from '@chakra-ui/react'

export default function Template({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>
          {children}
  </ChakraProvider>;
}
