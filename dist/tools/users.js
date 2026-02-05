/**
 * 用戶相關 MCP 工具
 */
export function registerUserTools(server, client) {
    return {
        // 搜尋用戶
        line_search_users: {
            name: "line_search_users",
            description: "搜尋 LINE 用戶，支援依名稱、標籤、狀態等條件篩選",
            inputSchema: {
                type: "object",
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
            handler: async (args) => {
                return client.searchUsers(args, args.botId);
            },
        },
        // 取得用戶詳情
        line_get_user: {
            name: "line_get_user",
            description: "取得特定用戶的詳細資料",
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
                        description: "用戶 ID",
                    },
                },
                required: ["userId"],
            },
            handler: async (args) => {
                return client.get(`/api/users/${args.userId}`, { botId: args.botId });
            },
        },
        // 更新用戶標籤（替換全部）
        line_update_user_tags: {
            name: "line_update_user_tags",
            description: "替換用戶的所有標籤（會覆蓋現有標籤）",
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
            handler: async (args) => {
                // 直接更新用戶資料，tags 放在 body 中
                return client.put(`/api/users/${args.userId}`, { tags: args.tags }, { botId: args.botId });
            },
        },
        // 新增單一標籤到用戶
        line_add_user_tag: {
            name: "line_add_user_tag",
            description: "新增單一標籤到用戶（不會影響現有標籤）",
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
                        description: "用戶 ID",
                    },
                    tagId: {
                        type: "string",
                        description: "要新增的標籤 ID",
                    },
                },
                required: ["userId", "tagId"],
            },
            handler: async (args) => {
                // 先取得用戶現有標籤
                const userResult = await client.get(`/api/users/${args.userId}`, { botId: args.botId });
                if (!userResult.success) {
                    return userResult;
                }
                const currentTags = userResult.data?.tags || [];
                // 檢查是否已有此標籤
                if (currentTags.includes(args.tagId)) {
                    return { success: true, message: "用戶已有此標籤", alreadyExists: true };
                }
                // 新增標籤
                const newTags = [...currentTags, args.tagId];
                return client.put(`/api/users/${args.userId}`, { tags: newTags }, { botId: args.botId });
            },
        },
        // 移除用戶的單一標籤
        line_remove_user_tag: {
            name: "line_remove_user_tag",
            description: "移除用戶的單一標籤（不會影響其他標籤）",
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
                        description: "用戶 ID",
                    },
                    tagId: {
                        type: "string",
                        description: "要移除的標籤 ID",
                    },
                },
                required: ["userId", "tagId"],
            },
            handler: async (args) => {
                // 先取得用戶現有標籤
                const userResult = await client.get(`/api/users/${args.userId}`, { botId: args.botId });
                if (!userResult.success) {
                    return userResult;
                }
                const currentTags = userResult.data?.tags || [];
                // 檢查是否有此標籤
                if (!currentTags.includes(args.tagId)) {
                    return { success: true, message: "用戶沒有此標籤", notFound: true };
                }
                // 移除標籤
                const newTags = currentTags.filter(t => t !== args.tagId);
                return client.put(`/api/users/${args.userId}`, { tags: newTags }, { botId: args.botId });
            },
        },
        // 更新用戶資料
        line_update_user: {
            name: "line_update_user",
            description: "更新用戶資料（名稱、備註、電話等）",
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
            handler: async (args) => {
                const { botId, userId, ...updateData } = args;
                return client.put(`/api/users/${userId}`, updateData, { botId });
            },
        },
        // 列出群組
        line_list_groups: {
            name: "line_list_groups",
            description: "列出 LINE 群組和多人聊天室",
            inputSchema: {
                type: "object",
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
            handler: async (args) => {
                const { botId, ...query } = args;
                return client.get('/api/groups', { botId, query: query });
            },
        },
    };
}
//# sourceMappingURL=users.js.map