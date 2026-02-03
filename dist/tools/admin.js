/**
 * 管理相關 MCP 工具
 */
export function registerAdminTools(server, client) {
    return {
        // 列出 Bot 帳號
        line_list_bots: {
            name: "line_list_bots",
            description: "列出所有可用的 LINE Bot 帳號",
            inputSchema: {
                type: "object",
                properties: {
                    includeInactive: {
                        type: "boolean",
                        description: "是否包含停用的帳號",
                        default: false,
                    },
                },
            },
            handler: async (args) => {
                return client.get('/api/bots', {
                    query: args.includeInactive ? { includeInactive: 'true' } : undefined,
                });
            },
        },
        // 取得 Bot 詳情
        line_get_bot: {
            name: "line_get_bot",
            description: "取得特定 Bot 帳號的詳細資訊和統計",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                    },
                },
                required: ["botId"],
            },
            handler: async (args) => {
                return client.get(`/api/bots/${args.botId}`);
            },
        },
        // 列出標籤
        line_list_tags: {
            name: "line_list_tags",
            description: "列出所有可用的標籤",
            inputSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        enum: ["project", "customer", "area", "product", "status", "other"],
                        description: "標籤類別篩選",
                    },
                },
            },
            handler: async (args) => {
                return client.get('/api/tags', {
                    query: args.category ? { category: args.category } : undefined,
                });
            },
        },
        // 建立標籤
        line_create_tag: {
            name: "line_create_tag",
            description: "建立新標籤",
            inputSchema: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "標籤名稱",
                    },
                    color: {
                        type: "string",
                        description: "標籤顏色（HEX 格式，如 #FF5733）",
                    },
                    category: {
                        type: "string",
                        enum: ["project", "customer", "area", "product", "status", "other"],
                        description: "標籤類別",
                        default: "other",
                    },
                    description: {
                        type: "string",
                        description: "標籤描述",
                    },
                },
                required: ["name"],
            },
            handler: async (args) => {
                return client.post('/api/tags', args);
            },
        },
        // 取得統計資料
        line_get_stats: {
            name: "line_get_stats",
            description: "取得系統統計資料",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                },
            },
            handler: async (args) => {
                return client.get('/api/stats', { botId: args.botId });
            },
        },
        // 取得發送日誌
        line_get_send_logs: {
            name: "line_get_send_logs",
            description: "取得訊息發送日誌",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                    status: {
                        type: "string",
                        enum: ["success", "failed", "pending"],
                        description: "發送狀態篩選",
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
            handler: async (args) => {
                const { botId, ...query } = args;
                return client.get('/api/sendlogs', { botId, query: query });
            },
        },
        // 取得功能設定
        line_get_features: {
            name: "line_get_features",
            description: "取得系統功能開關設定",
            inputSchema: {
                type: "object",
                properties: {},
            },
            handler: async () => {
                return client.get('/api/v2/features');
            },
        },
        // 取得品牌設定
        line_get_branding: {
            name: "line_get_branding",
            description: "取得系統品牌設定",
            inputSchema: {
                type: "object",
                properties: {},
            },
            handler: async () => {
                return client.get('/api/v2/branding');
            },
        },
    };
}
//# sourceMappingURL=admin.js.map