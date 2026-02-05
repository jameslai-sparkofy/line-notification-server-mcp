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
        // 使用 query parameter 而非路徑參數
        return client.get('/api/conversations', {
          botId: args.botId,
          query: {
            userId: args.targetId,
            ...(args.limit && { limit: args.limit }),
            ...(args.before && { before: args.before }),
          },
        });
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
          targetType: {
            type: "string",
            enum: ["user", "group"],
            description: "目標類型（預設依 ID 格式判斷）",
          },
        },
        required: ["targetId"],
      },
      handler: async (args: { botId?: string; targetId: string; targetType?: string }) => {
        // 判斷是 userId 還是 groupId
        const isGroup = args.targetType === 'group' || args.targetId.startsWith('C');
        const body = isGroup
          ? { groupId: args.targetId }
          : { userId: args.targetId };
        return client.post('/api/conversations/mark-read', body, { botId: args.botId });
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

    // 取得 Webhook 事件（收到的訊息紀錄）
    line_get_webhook_events: {
      name: "line_get_webhook_events",
      description: `取得收到的訊息紀錄（Webhook 事件）。

這是查詢用戶回傳訊息的主要方法。可依用戶 ID、群組 ID、事件類型等條件篩選。

常見用法：
- 查詢特定用戶的訊息：設定 sourceUserId
- 查詢特定群組的訊息：設定 sourceGroupId
- 只查詢文字訊息：設定 type=message`,
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          sourceUserId: {
            type: "string",
            description: "來源用戶 ID（篩選特定用戶的訊息）",
          },
          sourceGroupId: {
            type: "string",
            description: "來源群組 ID（篩選特定群組的訊息）",
          },
          type: {
            type: "string",
            enum: ["message", "follow", "unfollow", "join", "leave", "postback", "beacon"],
            description: "事件類型篩選",
          },
          limit: {
            type: "number",
            description: "回傳筆數上限",
            default: 50,
          },
          startDate: {
            type: "string",
            description: "開始日期（ISO 8601 格式）",
          },
          endDate: {
            type: "string",
            description: "結束日期（ISO 8601 格式）",
          },
        },
      },
      handler: async (args: {
        botId?: string;
        sourceUserId?: string;
        sourceGroupId?: string;
        type?: string;
        limit?: number;
        startDate?: string;
        endDate?: string;
      }) => {
        const { botId, ...query } = args;
        return client.get('/api/webhook-events', { botId, query: query as Record<string, string | number | boolean> });
      },
    },
  };
}
