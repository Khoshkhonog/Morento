import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/context";
export default function SupportWindow() {
    const [messages, setMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [websocketConnection, setWebsocketConnection] = useState<WebSocket | null>(null);
    const { currentUser } = useAppContext();
    useEffect(() => {
        if (currentUser?.user_id) {
            const connection = new WebSocket(
                `ws://127.0.0.1:8000/ws?username=${currentUser.username}&user_id=${currentUser.user_id}&role_id=${currentUser.role_id}`
            );
            connection.onmessage = (event: MessageEvent) => {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };
            setWebsocketConnection(connection);

            return () => {
                connection.close();
            };
        }
    }, [currentUser?.user_id]);

    const handleSendMessage = useCallback(() => {
        if (websocketConnection && userInput) {
            websocketConnection.send(userInput);
            setUserInput('');
        }
    }, [websocketConnection, userInput]);

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your message"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}


