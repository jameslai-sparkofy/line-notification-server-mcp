/**
 * 用戶相關 MCP 工具
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";

export function registerUserTools(server: Server, client: LineNotificationClient) {
  return {
    // 搜尋用戶
    line_search_users: {
      name: "line_search_users",
      description: "搜尋 LINE 用戶，支援依名稱、標籤、狀態等條件篩選",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          keyword: {
            type: "string",
            description: "搜尋關鍵字（名稱、電話）",
          },
          status: {
            type: "string",
            enum: ["active", "inactive", "blocked"],
            description: "用戶狀態篩選",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "標籤 ID 陣列（需全部符合）",
          },
          limit: {
            type: "number",
            description: "回傳筆數上限",
            default: 20,
          },
          page: {
            type: "number",
            description: "頁碼",
            default: 1,
          },
        },
      },
      handler: async (args: {
        botId?: string;
        keyword?: string;
        status?: string;
        tags?: string[];
        limit?: number;
        page?: number;
      }) => {
        return client.searchUsers(args, args.botId);
      },
    },

    // 取得用戶詳情
    line_get_user: {
      name: "line_get_user",
      description: "取得特定用戶的詳細資料",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          userId: {
            type: "string",
            description: "用戶 ID",
          },
        },
        required: ["userId"],
      },
      handler: async (args: { botId?: string; userId: string }) => {
        return client.get(`/api/users/${args.userId}`, { botId: args.botId });
      },
    },

    // 更新用戶標籤
    line_update_user_tags: {
      name: "line_update_user_tags",
      description: "更新用戶的標籤",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          userId: {
            type: "string",
            description: "用戶 ID",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "標籤 ID 陣列",
          },
        },
        required: ["userId", "tags"],
      },
      handler: async (args: { botId?: string; userId: string; tags: string[] }) => {
        return client.put(`/api/users/${args.userId}/tags`, { tags: args.tags }, { botId: args.botId });
      },
    },

    // 更新用戶資料
    line_update_user: {
      name: "line_update_user",
      description: "更新用戶資料（名稱、備註、電話等）",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          userId: {
            type: "string",
            description: "用戶 ID",
          },
          displayName: {
            type: "string",
            description: "顯示名稱",
          },
          note: {
            type: "string",
            description: "備註",
          },
          phone: {
            type: "string",
            description: "電話號碼",
          },
        },
        required: ["userId"],
      },
      handler: async (args: { botId?: string; userId: string; displayName?: string; note?: string; phone?: string }) => {
        const { botId, userId, ...updateData } = args;
        return client.put(`/api/users/${userId}`, updateData, { botId });
      },
    },

    // 列出群組
    line_list_groups: {
      name: "line_list_groups",
      description: "列出 LINE 群組和多人聊天室",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          chatType: {
            type: "string",
            enum: ["group", "room"],
            description: "聊天類型（group=群組, room=多人聊天）",
          },
          status: {
            type: "string",
            enum: ["active", "left"],
            description: "狀態篩選",
          },
          limit: {
            type: "number",
            description: "回傳筆數上限",
            default: 20,
          },
        },
      },
      handler: async (args: { botId?: string; chatType?: string; status?: string; limit?: number }) => {
        const { botId, ...query } = args;
        return client.get('/api/groups', { botId, query: query as Record<string, string | number | boolean> });
      },
    },
  };
}
