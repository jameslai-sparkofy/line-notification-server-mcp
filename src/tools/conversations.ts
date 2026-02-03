/**
 * 對話相關 MCP 工具
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";

export function registerConversationTools(server: Server, client: LineNotificationClient) {
  return {
    // 取得對話歷史
    line_get_conversation: {
      name: "line_get_conversation",
      description: "取得與特定用戶或群組的對話歷史",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          targetId: {
            type: "string",
            description: "用戶 ID 或群組 ID",
          },
          limit: {
            type: "number",
            description: "回傳訊息數量上限",
            default: 50,
          },
          before: {
            type: "string",
            description: "取得此時間之前的訊息（ISO 8601 格式）",
          },
        },
        required: ["targetId"],
      },
      handler: async (args: { botId?: string; targetId: string; limit?: number; before?: string }) => {
        return client.getConversation(args.targetId, {
          limit: args.limit,
          before: args.before,
        }, args.botId);
      },
    },

    // 取得未讀訊息
    line_get_unread: {
      name: "line_get_unread",
      description: "取得所有未讀訊息列表",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
        },
      },
      handler: async (args: { botId?: string }) => {
        return client.getUnreadMessages(args.botId);
      },
    },

    // 標記已讀
    line_mark_read: {
      name: "line_mark_read",
      description: "標記對話為已讀",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          targetId: {
            type: "string",
            description: "用戶 ID 或群組 ID",
          },
        },
        required: ["targetId"],
      },
      handler: async (args: { botId?: string; targetId: string }) => {
        return client.post(`/api/conversations/${args.targetId}/read`, {}, { botId: args.botId });
      },
    },

    // 取得對話列表
    line_list_conversations: {
      name: "line_list_conversations",
      description: "取得對話列表（依最後訊息時間排序）",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          type: {
            type: "string",
            enum: ["user", "group", "all"],
            description: "對話類型篩選",
            default: "all",
          },
          unreadOnly: {
            type: "boolean",
            description: "只顯示未讀對話",
            default: false,
          },
          limit: {
            type: "number",
            description: "回傳筆數上限",
            default: 20,
          },
        },
      },
      handler: async (args: { botId?: string; type?: string; unreadOnly?: boolean; limit?: number }) => {
        const { botId, ...query } = args;
        return client.get('/api/conversations', { botId, query: query as Record<string, string | number | boolean> });
      },
    },
  };
}
