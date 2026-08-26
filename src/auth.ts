import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiResponse } from "./lib/types/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let payload: ApiResponse;
        try {
          payload = await response.json();
        } catch {
          throw new Error("Unable to contact the login service");
        }

        if (!response.ok || "error" in payload) {
          throw new Error(
            "error" in payload ? payload.error : "Invalid credentials"
          );
        }

        return {
          id: payload.user._id,
          accesstoken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user };
      }

      if (trigger === "update" && session?.user) {
        token = {
          ...token,
          ...session.user,
        };
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user._id = token._id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.username = token.username;
      session.user.email = token.email || "";
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.isVerified = token.isVerified;
      session.user.createdAt = token.createdAt;
      session.user.accesstoken = token.accesstoken;
      session.user.photo = token.photo;
      return session;
    },
  },
};
