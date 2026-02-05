/**
 * 用戶相關 MCP 工具
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";
export declare function registerUserTools(server: Server, client: LineNotificationClient): {
    line_search_users: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                keyword: {
                    type: string;
                    description: string;
                };
                status: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    default: number;
                };
                page: {
                    type: string;
                    description: string;
                    default: number;
                };
            };
        };
        handler: (args: {
            botId?: string;
            keyword?: string;
            status?: string;
            tags?: string[];
            limit?: number;
            page?: number;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_user: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_update_user_tags: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId: string;
            tags: string[];
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_add_user_tag: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
                tagId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId: string;
            tagId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown> | {
            success: boolean;
            data?: {
                tags?: string[];
            };
        } | {
            success: boolean;
            message: string;
            alreadyExists: boolean;
        }>;
    };
    line_remove_user_tag: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
                tagId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId: string;
            tagId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown> | {
            success: boolean;
            data?: {
                tags?: string[];
            };
        } | {
            success: boolean;
            message: string;
            notFound: boolean;
        }>;
    };
    line_update_user: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
                displayName: {
                    type: string;
                    description: string;
                };
                note: {
                    type: string;
                    description: string;
                };
                phone: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId: string;
            displayName?: string;
            note?: string;
            phone?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_list_groups: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                chatType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                status: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    default: number;
                };
            };
        };
        handler: (args: {
            botId?: string;
            chatType?: string;
            status?: string;
            limit?: number;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
};
//# sourceMappingURL=users.d.ts.map