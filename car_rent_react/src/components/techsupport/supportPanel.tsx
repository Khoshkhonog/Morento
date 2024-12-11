import { set } from "js-cookie";
import { useAppContext } from "../context/context"
import { useState } from "react"
import { useCallback } from "react"

interface Message {
    id: number;
    conversation_id: number;
    user_id: number;
    role: string;
    username: string;
    text_message: string;
    // другие свойства...
}

export default function SupportPanel() {
    const [conversations, setConversations] = useState<Message[]>([])
    const { currentUser } = useAppContext()
    const [showConversation, setShowConversation] = useState('none')
    const [socketId, setSocetId] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false);
    const [showInput, setShowInput] = useState('none')
    const [supportMessage, setSupportMessage] = useState('')
    const [socketConnection, setSocketConnection] = useState<WebSocket | null>(null)

    const handleShowInput = () => {
        showInput === 'none' ? setShowInput('block') : setShowInput('none')
    };


    let socket: WebSocket | null = null;

    const handleSendMessage = useCallback(() => {
        console.log(socket)
        if (socketConnection) {
            socketConnection.send(supportMessage)
            setSupportMessage('')
        }
    }, [socket, supportMessage]);

    if (currentUser?.role_id !== 2) {
        return <div>You are not allowed to access this page</div>
    }
    function isWebSocket(obj: any): obj is WebSocket {
        return obj instanceof WebSocket;
    }

    if (!isConnected && socketId !== null) {
        socket = new WebSocket(`ws://127.0.0.1:8000/ws/conversation/${socketId}?role_id=${currentUser?.role_id}`)
        setSocketConnection(socket)
        setIsConnected(true)
    }
    if (isWebSocket(socket)) {
        socket.onopen = () => {
            console.log("Connected to the server");
            handleShowInput();
            // Отправка сообщения на сервер

        };

        socket.onmessage = (event) => {
            const data = event.data
            if (data.conversation_id) {
                setConversations((prevConversations) => [...prevConversations, data]);
            }
        };

        socket.onclose = () => {
            console.log("Connection closed");
            setSocetId(null);
            handleShowInput();
        }
    }

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/support/conversations', {
                method: 'GET',
                credentials: "include",
                mode: 'cors'
            })

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setConversations(data)
            console.log(data)

        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    if (conversations.length === 0) {
        getData()
    }

    const groupedConversations = conversations.sort((a, b) => a.id - b.id).reduce((acc: { [key: string]: Message[] }, current) => {
        const conversationId: string = current.conversation_id.toString();
        if (!acc[conversationId]) {
            acc[conversationId] = [];
        }
        acc[conversationId].push(current);
        return acc;
    }, {});

    return <div className="support-pannel">
        <h1>Support Panel</h1>
        <button onClick={() => getData()}>Refresh</button>
        <div className="conversation-class">{Object.keys(groupedConversations).map((key) =>
            <div>
                <div>
                    <h2 className="conversation_id_button" onClick={() => setShowConversation(showConversation === 'none' ? 'flex' : 'none')} >{`Conversation_id: ${key}`}</h2>
                    <button onClick={() => setSocetId(key)}>connect</button>
                </div>
                <div>
                    {groupedConversations[key].map((message) => (
                        <div key={message.id} style={{ display: showConversation }} className="message-container">
                            <div>{`${message.username} : ${message.text_message}`}</div>
                        </div>

                    ))}
                </div>
                <div style={{ display: showInput }} key={key}>
                    <div className="input-container">
                        <input type="text" placeholder="Enter your message" value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>)}</div>
    </div>
}
