#!/usr/bin/env node
/**
 * LINE Notification MCP Server
 * 完整版 - 支援所有 LINE Notification Server 功能
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { LineNotificationClient } from "./client.js";
import { registerMessagingTools } from "./tools/messaging.js";
import { registerUserTools } from "./tools/users.js";
import { registerConversationTools } from "./tools/conversations.js";
import { registerCampaignTools } from "./tools/campaigns.js";
import { registerAdminTools } from "./tools/admin.js";
// 環境變數
const BASE_URL = process.env.LINE_SERVER_URL || process.env.LINE_API_BASE_URL || "https://line.yes-ceramics.com";
const API_KEY = process.env.LINE_API_KEY;
const USERNAME = process.env.LINE_API_USERNAME || "admin";
const PASSWORD = process.env.LINE_API_PASSWORD || "";
const DEFAULT_BOT_ID = process.env.LINE_DEFAULT_BOT_ID || "default";
// 啟動時輸出設定 (stderr 不會干擾 MCP 通訊)
console.error(`[LINE MCP] 設定: BASE_URL=${BASE_URL}, USERNAME=${USERNAME}, PASSWORD=${PASSWORD ? '已設定' : '未設定'}`);
console.error(`[LINE MCP] 環境變數: LINE_API_BASE_URL=${process.env.LINE_API_BASE_URL}, LINE_API_PASSWORD=${process.env.LINE_API_PASSWORD ? '已設定' : '未設定'}`);
// 建立 API 客戶端
const client = new LineNotificationClient({
    baseUrl: BASE_URL,
    apiKey: API_KEY,
    username: USERNAME,
    password: PASSWORD,
    defaultBotId: DEFAULT_BOT_ID,
});
// 建立 Server
const server = new Server({
    name: "line-notification-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// 收集所有工具
const allTools = {};
// 註冊所有工具模組
const messagingTools = registerMessagingTools(server, client);
const userTools = registerUserTools(server, client);
const conversationTools = registerConversationTools(server, client);
const campaignTools = registerCampaignTools(server, client);
const adminTools = registerAdminTools(server, client);
// 合併工具
Object.assign(allTools, messagingTools, userTools, conversationTools, campaignTools, adminTools);
// 加入萬用 API 調用工具
allTools.line_call_api = {
    name: "line_call_api",
    description: `調用 LINE Notification Server 任意 API。

常用端點：
- GET /api/users - 用戶列表
- GET /api/groups - 群組列表
- GET /api/messages - 訊息模板
- GET /api/campaigns - 推播活動
- GET /api/bots - Bot 帳號
- GET /api/tags - 標籤列表
- GET /api/sendlogs - 發送日誌
- GET /api/conversations - 對話列表

所有請求可透過 X-Bot-Id header（botId 參數）指定操作的帳號。`,
    inputSchema: {
        type: "object",
        properties: {
            method: {
                type: "string",
                enum: ["GET", "POST", "PUT", "DELETE"],
                description: "HTTP 方法",
            },
            endpoint: {
                type: "string",
                description: "API 端點路徑，如 /api/users",
            },
            botId: {
                type: "string",
                description: "Bot 帳號 ID",
                default: "default",
            },
            query: {
                type: "object",
                description: "Query 參數（GET 請求用）",
            },
            body: {
                type: "object",
                description: "Request body（POST/PUT 請求用）",
            },
        },
        required: ["method", "endpoint"],
    },
    handler: async (args) => {
        const { method, endpoint, botId, query, body } = args;
        return client.request(method, endpoint, { botId, query, body });
    },
};
// 註冊工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: Object.values(allTools).map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        })),
    };
});
// 處理工具調用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        const tool = allTools[name];
        if (!tool) {
            return {
                content: [
                    {
                        type: "text",
                        text: `未知的工具: ${name}`,
                    },
                ],
                isError: true,
            };
        }
        const result = await tool.handler(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `工具調用失敗: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
            isError: true,
        };
    }
});
// 啟動 Server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("LINE Notification MCP Server 已啟動");
    console.error(`連線至: ${BASE_URL}`);
}
main().catch(console.error);
//# sourceMappingURL=index.js.map