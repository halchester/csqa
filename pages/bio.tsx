import { Badge, Box, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { useUser } from "../hooks/users";
import { Question } from "../types/common";

const BioPage = ({}) => {
  // console.log(user);
  // return (
  //   <Layout>
  //     <Text>{user.fullName}</Text>
  //     <Text as='span' fontSize='sm' color='gray.500'>
  //       {user.username} |
  //     </Text>
  //     <Text as='span' fontSize='sm' color='gray.500'>
  //       &nbsp;{user.email}
  //     </Text>
  //     <Stack spacing='4' my='6'>
  //       <Text fontSize='lg'>Questions you've uploaded</Text>
  //       {user.questions.map((question: Question) => (
  //         <>
  //           <Text key={question.questionId} as='span'>
  //             <Link href={`/question/${question.questionId}`}>
  //               {question.title}
  //             </Link>
  //           </Text>
  //           <Badge as='span'>{question.points}</Badge>
  //         </>
  //       ))}
  //     </Stack>
  //   </Layout>
  // );
};

export default BioPage;
