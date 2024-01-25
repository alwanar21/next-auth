import { prisma } from "@/lib/Prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  const newId = nanoid();
  let userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  try {
    const payload = await req.json();
    const validPayload = await userSchema.validate(payload);
    const user = await prisma.user.findUnique({
      where: {
        email: validPayload.email,
      },
    });

    if (user !== null) {
      return Response.json(
        {
          message: "Email is used!!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await prisma.user.create({
      data: {
        id: newId,
        username: validPayload.username,
        email: validPayload.email,
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        data: "Account successfully created",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return Response.json(
        {
          message: error?.message,
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          message: error,
        },
        { status: 500 }
      );
    }
  }
}
