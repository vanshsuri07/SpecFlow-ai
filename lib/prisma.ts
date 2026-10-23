import type { PrismaClient as PrismaClientType } from '../app/generated/prisma/client';

type PrismaClient = PrismaClientType;

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

let prisma: PrismaClient;

function getPrismaClient(): PrismaClient {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('../app/generated/prisma/client');
  
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  // For postgresql with adapter-pg
  if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { PrismaPg } = require('@prisma/adapter-pg');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pg = require('pg');
      
      const pool = new pg.Pool({ connectionString: dbUrl });
      const adapter = new PrismaPg(pool);
      
      return new PrismaClient({ adapter });
    } catch (e) {
      // Fallback: let Prisma use its default behavior
      return new PrismaClient();
    }
  }
  
  // For Accelerate/Edge URLs or other datasources
  return new PrismaClient();
}

if (process.env.NODE_ENV === 'production') {
  prisma = getPrismaClient();
} else {
  if (!global.__prismaClient) {
    global.__prismaClient = getPrismaClient();
  }
  prisma = global.__prismaClient as PrismaClient;
}

export default prisma;
