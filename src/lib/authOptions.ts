import { type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProviver from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "./db";
import { drizzleAdapter } from "./drizzleAdapter";
import { Adapter } from "next-auth/adapters";


//TODO add this to the types folder 
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}


export const authOptions: NextAuthOptions = {

  adapter: drizzleAdapter(db) as Adapter,
  providers: [
    GoogleProviver({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },

}