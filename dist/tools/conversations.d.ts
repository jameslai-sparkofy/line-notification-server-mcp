/**
 * 對話相關 MCP 工具
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";
export declare function registerConversationTools(server: Server, client: LineNotificationClient): {
    line_get_conversation: {
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
                targetId: {
                    type: string;
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    default: number;
                };
                before: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            targetId: string;
            limit?: number;
            before?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_unread: {
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
            };
        };
        handler: (args: {
            botId?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_mark_read: {
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
                targetId: {
                    type: string;
                    description: string;
                };
                targetType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            targetId: string;
            targetType?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_list_conversations: {
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
                type: {
                    type: string;
                    enum: string[];
                    description: string;
                    default: string;
                };
                unreadOnly: {
                    type: string;
                    description: string;
                    default: boolean;
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
            type?: string;
            unreadOnly?: boolean;
            limit?: number;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_webhook_events: {
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
                sourceUserId: {
                    type: string;
                    description: string;
                };
                sourceGroupId: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    default: number;
                };
                startDate: {
                    type: string;
                    description: string;
                };
                endDate: {
                    type: string;
                    description: string;
                };
            };
        };
        handler: (args: {
            botId?: string;
            sourceUserId?: string;
            sourceGroupId?: string;
            type?: string;
            limit?: number;
            startDate?: string;
            endDate?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
};
//# sourceMappingURL=conversations.d.ts.map