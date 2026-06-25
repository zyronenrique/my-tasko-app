import argon2 from "argon2";
import { prisma } from "../lib/prisma";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../lib/jwt";

export async function register(
  email: string,
  password: string,
  name: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }
  const hashedPassword = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      ),
    },
  });
  return {
    accessToken,
    refreshToken,
  };
}

export async function login(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }
  const valid = await argon2.verify(
    user.password,
    password
  );
  if (!valid) {
    throw new Error(
      "Invalid credentials"
    );
  }
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      ),
    },
  });
  return {
    accessToken,
    refreshToken,
  };
}

export async function logout(
  userId: number
) {
  await prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
}

export async function refresh(
  refreshToken: string
) {
  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
    include: {
      user: true,
    },
  });
  if (!storedToken) {
    throw new Error(
      "Invalid refresh token"
    );
  }
  if (storedToken.expiresAt<new Date()) {
    throw new Error(
      "Refresh token expired"
    );
  }
  verifyRefreshToken(refreshToken);
  return {
    accessToken:generateAccessToken(storedToken.user.id),
  };
}

export async function me(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}
