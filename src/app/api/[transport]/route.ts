import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod'
 
const handler = createMcpHandler(
  (server) => {
    server.tool(
      "roll_dice",
      "Rolls an N-sided die",
      { sides: z.number().int().min(2) },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return {
          content: [{ type: "text", text: `🎲 You rolled a ${value}!` }],
        };
      }
    );
  },
  {
    capabilities: {
      tools: {
        roll_dice: {
            description: "Rolls an N-sided die"
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    verboseLogs: true,
    maxDuration: 60,
    streamableHttpEndpoint: '/api/mcp',
    sseEndpoint: '/api/sse',
    basePath: '/api'
  }
);
 
export { handler as GET, handler as POST, handler as DELETE };
