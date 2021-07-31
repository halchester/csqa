import { Flex, Link, Text, Box } from "@chakra-ui/react";
import React from "react";
import { SmallText } from "../utils";
import { useUser } from "../../hooks/users";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <div>
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
    </div>
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
      <div>
        <Text as='span' fontSize='lg'>
          <Link href='/'>csqa</Link>
        </Text>
      </div>
      <div>
        <Link href='/search'>
          <Text as='span' fontSize='md' color='gray.500'>
            Search
          </Text>
        </Link>
        <Text as='span' fontSize='md' color='gray.500'>
          &nbsp; | &nbsp;
        </Text>
        <Link href='/question/new'>
          <Text as='span' fontSize='md' color='gray.500'>
            New Question
          </Text>
        </Link>
      </div>
    </Flex>
  );
};

const Config = () => {
  const [user] = useUser();
  return (
    <Flex
      justifyContent='space-around'
      alignItems='center'
      maxWidth='md'
      mx='auto'
    >
      {user ? (
        <SmallText link='/bio'>{user.username} / Logout</SmallText>
      ) : (
        <SmallText link='/signup'>Log In/ Sign Up</SmallText>
      )}
      {/* <SmallText link='/leaderboard'>Leaderboard </SmallText> */}
      {/* <SmallText link='/creator'>Creator </SmallText> */}
      <SmallText link='https://github.com/halchester/csqa'>
        Source Code{" "}
      </SmallText>
    </Flex>
  );
};
