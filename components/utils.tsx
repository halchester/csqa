import * as React from "react";
import {Text, Link} from "@chakra-ui/react";

export const SmallText = ({
  children,
  link
}: {
  children: React.ReactNode;
  link?: string;
}): JSX.Element => {
  return (
    <Text fontSize='sm' fontWeight='semibold' color='gray.600'>
      <Link href={link}>{children}</Link>
    </Text>
  );
};
