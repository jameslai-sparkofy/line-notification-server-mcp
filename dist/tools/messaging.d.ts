/**
 * 訊息相關 MCP 工具
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";
export declare function registerMessagingTools(server: Server, client: LineNotificationClient): {
    line_send_text: {
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
                groupId: {
                    type: string;
                    description: string;
                };
                text: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId?: string;
            groupId?: string;
            text: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_send_flex: {
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
                groupId: {
                    type: string;
                    description: string;
                };
                altText: {
                    type: string;
                    description: string;
                };
                contents: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            userId?: string;
            groupId?: string;
            altText: string;
            contents: Record<string, unknown>;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_send_template: {
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
                templateId: {
                    type: string;
                    description: string;
                };
                userId: {
                    type: string;
                    description: string;
                };
                groupId: {
                    type: string;
                    description: string;
                };
                variables: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            templateId: string;
            userId?: string;
            groupId?: string;
            variables?: Record<string, unknown>;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_list_templates: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                category: {
                    type: string;
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
            category?: string;
            limit?: number;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
};
//# sourceMappingURL=messaging.d.ts.map