import { prisma } from "@/lib/Prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const JwtKey = process.env.JWT_SECRET_KEY;
    const authToken = (req.headers.get("authorization") || "").split("Bearer ").at(1);
    if (!authToken) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    var decodedToken = jwt.verify(authToken, JwtKey as string);
    if (typeof decodedToken === "string") {
      return Response.json(
        {
          message: decodedToken,
        },
        { status: 401 }
      );
    }

    const { id } = decodedToken;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user == null) {
      return Response.json(
        {
          message: "user not found",
        },
        { status: 404 }
      );
    }

    const { password, ...restData } = user;

    return Response.json(
      {
        data: restData,
      },
      { status: 401 }
    );
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
