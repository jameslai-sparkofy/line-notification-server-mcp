/**
 * 推播活動相關 MCP 工具
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";

export function registerCampaignTools(server: Server, client: LineNotificationClient) {
  return {
    // 列出推播活動
    line_list_campaigns: {
      name: "line_list_campaigns",
      description: "列出推播活動",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          status: {
            type: "string",
            enum: ["draft", "scheduled", "active", "completed", "cancelled"],
            description: "活動狀態篩選",
          },
          limit: {
            type: "number",
            description: "回傳筆數上限",
            default: 20,
          },
        },
      },
      handler: async (args: { botId?: string; status?: string; limit?: number }) => {
        const { botId, ...query } = args;
        return client.get('/api/campaigns', { botId, query: query as Record<string, string | number | boolean> });
      },
    },

    // 取得活動詳情
    line_get_campaign: {
      name: "line_get_campaign",
      description: "取得推播活動詳情",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          campaignId: {
            type: "string",
            description: "活動 ID",
          },
        },
        required: ["campaignId"],
      },
      handler: async (args: { botId?: string; campaignId: string }) => {
        return client.get(`/api/campaigns/${args.campaignId}`, { botId: args.botId });
      },
    },

    // 建立推播活動
    line_create_campaign: {
      name: "line_create_campaign",
      description: "建立新的推播活動",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          name: {
            type: "string",
            description: "活動名稱",
          },
          description: {
            type: "string",
            description: "活動描述",
          },
          messageId: {
            type: "string",
            description: "訊息模板 ID",
          },
          targetType: {
            type: "string",
            enum: ["all", "tags", "users"],
            description: "目標類型",
          },
          targetTags: {
            type: "array",
            items: { type: "string" },
            description: "目標標籤 ID 陣列（targetType=tags 時使用）",
          },
          targetUsers: {
            type: "array",
            items: { type: "string" },
            description: "目標用戶 ID 陣列（targetType=users 時使用）",
          },
          scheduledAt: {
            type: "string",
            description: "排程發送時間（ISO 8601 格式）",
          },
        },
        required: ["name", "messageId", "targetType"],
      },
      handler: async (args: {
        botId?: string;
        name: string;
        description?: string;
        messageId: string;
        targetType: string;
        targetTags?: string[];
        targetUsers?: string[];
        scheduledAt?: string;
      }) => {
        const { botId, ...data } = args;
        return client.post('/api/campaigns', data, { botId });
      },
    },

    // 加入用戶到活動
    line_enroll_campaign: {
      name: "line_enroll_campaign",
      description: "將用戶加入推播活動",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          campaignId: {
            type: "string",
            description: "活動 ID",
          },
          userIds: {
            type: "array",
            items: { type: "string" },
            description: "用戶 ID 陣列",
          },
        },
        required: ["campaignId", "userIds"],
      },
      handler: async (args: { botId?: string; campaignId: string; userIds: string[] }) => {
        return client.post(`/api/campaigns/${args.campaignId}/enroll`, {
          userIds: args.userIds,
        }, { botId: args.botId });
      },
    },

    // 取消活動
    line_cancel_campaign: {
      name: "line_cancel_campaign",
      description: "取消推播活動",
      inputSchema: {
        type: "object" as const,
        properties: {
          botId: {
            type: "string",
            description: "Bot 帳號 ID",
            default: "default",
          },
          campaignId: {
            type: "string",
            description: "活動 ID",
          },
        },
        required: ["campaignId"],
      },
      handler: async (args: { botId?: string; campaignId: string }) => {
        return client.post(`/api/campaigns/${args.campaignId}/cancel`, {}, { botId: args.botId });
      },
    },
  };
}
