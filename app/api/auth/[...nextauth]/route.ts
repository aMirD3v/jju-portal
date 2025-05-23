import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserWithUsername } from "@/lib/auth";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await getUserWithUsername(credentials.username);
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        // Attach all needed fields here
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.name,
          role: user.role,
          studentID: user.studentID,
          institute: user.institute,
          department: user.department,
          academicYear: user.academicYear,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.fullName = user.fullName;
        token.studentID = user.studentID;
        token.institute = user.institute;
        token.department = user.department;
        token.academicYear = user.academicYear;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.fullName = token.fullName;
        session.user.studentID = token.studentID;
        session.user.institute = token.institute;
        session.user.department = token.department;
        session.user.academicYear = token.academicYear;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
    updateAge: 15 * 60 // 15 minutes
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
