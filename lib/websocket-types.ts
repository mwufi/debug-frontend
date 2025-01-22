export type WebSocketMessage = {
    type: string;
    data?: any;
    id?: string;
}

export type WebSocketHandler = (message: WebSocketMessage) => void;

export interface WebSocketEventMap {
    onMessage: (handler: WebSocketHandler) => void;
    onTextDelta: (handler: (text: string) => void) => void;
    onStart: (handler: (id: string) => void) => void;
    onStop: (handler: (id: string) => void) => void;
    onError: (handler: (error: string) => void) => void;
}

export interface WebSocketApi {
    sendMessage: (type: string, data?: any) => void;
    connect: () => void;
    disconnect: () => void;
    isConnected: boolean;
} 