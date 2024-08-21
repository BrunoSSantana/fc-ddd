import { PrismaClient } from "@prisma/client";

class PrismaService {
  private readonly url?: string;
  client: null | PrismaClient = null;

  constructor(url?: string) {
    const urlFromEnv = process.env.DATABASE_URL;

    this.url = url || (urlFromEnv as string);
  }

  connect(url?: string): PrismaClient {
    if (this.client !== null) {
      return this.client;
    }

    if (!url && !this.url) {
      throw new Error("DATABASE_URL must be defined");
    }

    this.client = new PrismaClient({
      datasources: {
        db: {
          url: url || this.url,
        },
      },
    });

    return this.client;
  }

  async disconnect(): Promise<void> {
    if (this.client !== null) {
      await this.client.$disconnect();
    }
  }
}

export const prismaService = new PrismaService();
