import {Textarea} from "@chakra-ui/react";
import * as React from "react";

type IProps = {
  name: string;
  handleChange: any;
  value: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export const CustomEditor = ({
  name,
  handleChange,
  value
}: IProps): JSX.Element => {
  return (
    <>
      <Textarea value={value} onChange={handleChange} name={name} />
    </>
  );
};
