import {Flex, Link, Text, Box} from "@chakra-ui/react";
import React from "react";
import {useUser} from "../../hooks/user";
import {useUserData} from "../../store/userStore";
import {User} from "../../types/common";
import {SmallText} from "../utils/SmallText";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({children}: IProps): JSX.Element => {
  const setUserData = useUserData((state) => state.setUserData);
  const [data] = useUser();
  const userData = useUserData((state) => state.userData);

  console.log("llayout ->>>>>", userData);

  React.useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, []);

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
      <Config userData={userData} />
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

const Config = ({userData}: {userData: User | null}) => {
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
