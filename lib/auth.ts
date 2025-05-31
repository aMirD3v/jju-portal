// lib/auth.ts
import { prisma } from './prisma';

export const getUserWithUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    
    if (!user) return null;
    
    return user;
  } catch (error) {
    console.error('Error fetching user with username:', error);
    return null;
  }
};
