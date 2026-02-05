/**
 * 訊息相關 MCP 工具
 */
export function registerMessagingTools(server, client) {
    // 這裡定義訊息相關的工具
    return {
        // 發送文字訊息
        line_send_text: {
            name: "line_send_text",
            description: "發送文字訊息給用戶或群組",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                    userId: {
                        type: "string",
                        description: "用戶 ID（與 groupId 擇一）",
                    },
                    groupId: {
                        type: "string",
                        description: "群組 ID（與 userId 擇一）",
                    },
                    text: {
                        type: "string",
                        description: "訊息內容",
                    },
                },
                required: ["text"],
            },
            handler: async (args) => {
                const { botId, userId, groupId, text } = args;
                if (!userId && !groupId) {
                    return { success: false, error: "必須提供 userId 或 groupId" };
                }
                return client.sendMessage({ userId, groupId }, { type: "text", text }, botId);
            },
        },
        // 發送 Flex Message
        line_send_flex: {
            name: "line_send_flex",
            description: "發送 Flex Message（彈性訊息）給用戶或群組",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                    userId: {
                        type: "string",
                        description: "用戶 ID（與 groupId 擇一）",
                    },
                    groupId: {
                        type: "string",
                        description: "群組 ID（與 userId 擇一）",
                    },
                    altText: {
                        type: "string",
                        description: "替代文字（用於通知預覽）",
                    },
                    contents: {
                        type: "object",
                        description: "Flex Message 內容（JSON 格式）",
                    },
                },
                required: ["altText", "contents"],
            },
            handler: async (args) => {
                const { botId, userId, groupId, altText, contents } = args;
                if (!userId && !groupId) {
                    return { success: false, error: "必須提供 userId 或 groupId" };
                }
                return client.sendMessage({ userId, groupId }, { type: "flex", altText, contents }, botId);
            },
        },
        // 使用模板發送
        line_send_template: {
            name: "line_send_template",
            description: "使用訊息模板發送訊息",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                    templateId: {
                        type: "string",
                        description: "模板 ID",
                    },
                    userId: {
                        type: "string",
                        description: "用戶 ID（與 groupId 擇一）",
                    },
                    groupId: {
                        type: "string",
                        description: "群組 ID（與 userId 擇一）",
                    },
                    variables: {
                        type: "object",
                        description: "模板變數",
                    },
                },
                required: ["templateId"],
            },
            handler: async (args) => {
                const { botId, templateId, userId, groupId, variables } = args;
                return client.post(`/api/messages/${templateId}/send`, {
                    userId,
                    groupId,
                    variables,
                }, { botId });
            },
        },
        // 列出已建立的訊息
        line_list_templates: {
            name: "line_list_templates",
            description: "列出已建立的訊息（從模板建立的訊息實例）",
            inputSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        description: "訊息類別篩選",
                    },
                    limit: {
                        type: "number",
                        description: "回傳筆數上限",
                        default: 20,
                    },
                },
            },
            handler: async (args) => {
                const { category, limit = 20 } = args;
                return client.get('/api/messages', {
                    query: {
                        ...(category && { category }),
                        limit,
                    },
                });
            },
        },
        // 列出訊息模板定義
        line_list_message_templates: {
            name: "line_list_message_templates",
            description: "列出可用的訊息模板定義（用於建立新訊息）",
            inputSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        description: "模板類別篩選",
                    },
                },
            },
            handler: async (args) => {
                const { category } = args;
                return client.get('/api/templates', {
                    query: {
                        ...(category && { category }),
                    },
                });
            },
        },
        // 從模板建立訊息
        line_create_message: {
            name: "line_create_message",
            description: "從模板建立新訊息。建立後可用 line_send_template 發送，或透過 messageId 追蹤點擊統計。",
            inputSchema: {
                type: "object",
                properties: {
                    botId: {
                        type: "string",
                        description: "Bot 帳號 ID",
                        default: "default",
                    },
                    name: {
                        type: "string",
                        description: "訊息名稱（用於識別和管理）",
                    },
                    templateId: {
                        type: "string",
                        description: "模板 ID（從 line_list_message_templates 取得）",
                    },
                    params: {
                        type: "object",
                        description: "模板參數（根據模板定義的 parameters 填入）",
                    },
                },
                required: ["name", "templateId", "params"],
            },
            handler: async (args) => {
                const { botId, name, templateId, params } = args;
                return client.post('/api/messages', {
                    name,
                    templateId,
                    params,
                }, { botId });
            },
        },
    };
}
//# sourceMappingURL=messaging.js.map