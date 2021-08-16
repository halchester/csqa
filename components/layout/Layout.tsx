import {Flex, Link, Text, Box} from "@chakra-ui/react";
import React from "react";
import {SmallText} from "../utils";
import {useUserData} from "../../store/userStore";
// import { useUser } from "../../hooks/users";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({children}: IProps): JSX.Element => {
  return (
    <>
      <Header />
      <Box
        justifyContent='space-between'
        alignItems='center'
        p='6'
        maxWidth='lg'
        mx='auto'
      >
        {children}
      </Box>
      <Config />
    </>
  );
};

const Header = () => {
  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      p='6'
      maxWidth='md'
      mx='auto'
    >
      <Box>
        <Text as='span' fontSize='lg'>
          <Link href='/'>csqa</Link>
        </Text>
      </Box>
      <Box>
        <Text as='span' fontSize='md' color='gray.500'>
          <Link href='/search'>Search</Link>
        </Text>
        <Text as='span' fontSize='md' color='gray.500'>
          &nbsp; | &nbsp;
        </Text>
        <Text as='span' fontSize='md' color='gray.500'>
          <Link href='/question/new'>New Question</Link>
        </Text>
      </Box>
    </Flex>
  );
};

const Config = () => {
  const userData = useUserData((state) => state.userData);
  // const [user] = useUser();
  console.log("in layout config", userData);

  return (
    <Flex
      justifyContent='space-around'
      alignItems='center'
      maxWidth='md'
      mx='auto'
    >
      {userData ? (
        <SmallText link='/bio'>{userData?.username} / Logout</SmallText>
      ) : (
        <SmallText link='/login'>Log In/ Sign Up</SmallText>
      )}
      {/* <SmallText link='/leaderboard'>Leaderboard </SmallText> */}
      {/* <SmallText link='/creator'>Creator </SmallText> */}
      <SmallText link='https://github.com/halchester/csqa'>
        Source Code{" "}
      </SmallText>
    </Flex>
  );
};
