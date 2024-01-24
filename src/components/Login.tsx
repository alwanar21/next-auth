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
    email: yup.string().email().required(),
    password: yup.string().max(6).required(),
  })
  .required();

type formValues = {
  email: string;
  password: string;
};

export default function Login() {
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
      <Button
        onPress={onOpen}
        variant="light"
        className={twMerge("hover:bg-red-200 text-gray-600 focus:bg-transparent")}
      >
        Log In
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
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    defaultValue="valid@email.com"
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
                    Sign in
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
