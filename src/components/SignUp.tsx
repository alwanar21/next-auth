import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { twMerge } from "tw-merge";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().max(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

type formValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "valid@email.com",
      password: "",
    },
  });
  const onSubmit = (data: formValues) => {
    console.log(data);
  };
  return (
    <>
      <Button onPress={onOpen} variant="flat" color="primary" className="text-blue-500">
        Sign Up
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="transparent"
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
                <ModalBody>
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    variant="bordered"
                    isInvalid={!!errors.username}
                    errorMessage={errors.username && errors.username.message}
                    {...register("username")}
                  />
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email && errors.email.message}
                    {...register("email")}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password && errors.password.message}
                    {...register("password")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Sign up
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
