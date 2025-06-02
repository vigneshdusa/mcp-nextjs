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
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
    basePath: "/api/mcp",
  }
);
 
export { handler as GET, handler as POST, handler as DELETE };