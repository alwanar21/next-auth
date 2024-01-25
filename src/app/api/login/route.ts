import { prisma } from "@/lib/Prisma";
import bcrypt from "bcrypt";
import * as yup from "yup";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  type UserType = {
    email: string;
    password: string;
  };

  const userSchema = yup
    .object<UserType>({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  try {
    const payload = await req.json();
    const JwtKey = process.env.JWT_SECRET_KEY;
    const validPayload: UserType = (await userSchema.validate(payload)) as UserType;
    const user = await prisma.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (user == null) {
      return Response.json(
        {
          message: "Email or password is wrong!!",
        },
        { status: 400 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    const isPasswordValid = await bcrypt.compare(validPayload.password, password);
    if (!isPasswordValid) {
      return Response.json(
        {
          message: "Email or password is wrong!!",
        },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign(userWithoutPassword, JwtKey as string);

    return Response.json(
      {
        accessToken: accessToken,
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
