import { WebSocketMessage, WebSocketHandler, WebSocketEventMap, WebSocketApi } from './websocket-types';

export class WebSocketService {
    private ws: WebSocket | null = null;
    private _isConnected: boolean = false;
    private connectionPromise: Promise<void> | null = null;
    private messageCallback: ((message: any) => void) | null = null;

    constructor(
        private url: string = 'ws://127.0.0.1:8000/ws',
        onMessage?: (message: any) => void
    ) {
        if (onMessage) {
            this.messageCallback = onMessage;
        }
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    connect = () => {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.connectionPromise = Promise.resolve();
            return this.connectionPromise;
        }

        if (!this.connectionPromise) {
            this.connectionPromise = new Promise((resolve, reject) => {
                this.ws = new WebSocket(this.url);

                this.ws.onopen = () => {
                    this._isConnected = true;
                    console.log('WebSocket connected');
                    resolve();
                };

                this.ws.onclose = () => {
                    this._isConnected = false;
                    this.connectionPromise = null;
                    console.log('WebSocket disconnected');
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    try {
                        let message;
                        // Try to parse as JSON, but fall back to raw data if not JSON
                        try {
                            message = JSON.parse(event.data);
                        } catch {
                            message = { type: 'raw', data: event.data };
                        }

                        if (this.messageCallback) {
                            this.messageCallback(message);
                        }
                    } catch (error) {
                        console.error('Error processing message:', error);
                    }
                };
            });
        }

        return this.connectionPromise;
    };

    disconnect = () => {
        this.ws?.close();
        this.ws = null;
        this._isConnected = false;
        this.connectionPromise = null;
    };

    sendMessage = async (type: string, data?: any) => {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            try {
                await this.connect();
            } catch (error) {
                throw new Error('Failed to establish WebSocket connection');
            }
        }

        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket is not connected');
        }

        this.ws.send(JSON.stringify({ type, data }));
    };
} 