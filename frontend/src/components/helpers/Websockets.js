import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const WShelper = (namespace,postID, headers) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const [users, setUsers] = useState([]); // received users
    const socketRef = useRef();

    useEffect(() => {

        // Creates a WebSocket connection
        socketRef.current = io(`${SOCKET_SERVER_URL}/${namespace}`, {
            query: {
                roomId:postID,
            },
            extraHeaders:{...headers},
            withCredentials: true,
        });

        socketRef.current.on("test", msg => {
            console.log(msg)
        })

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [postID]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody) => {
        console.log(messageBody)
        // socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        //     body: messageBody,
        //     senderId: socketRef.current.id,
        // });
    };

    return { messages, sendMessage, users };
};

export default WShelper;