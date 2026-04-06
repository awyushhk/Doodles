import { io } from "socket.io-client";

// In dev, Vite proxies this to 5000. In prod, both run on the same port anyway.
export const socket = io("/", { transports: ["websocket"] });