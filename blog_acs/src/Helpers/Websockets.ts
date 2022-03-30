import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const WShelper = (namespace:string,postID:string|undefined, headers:Object) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const [users, setUsers] = useState([]); // received users
    const socketRef = useRef();

    useEffect(() => {

        // Creates a WebSocket connection
        // @ts-ignore
        socketRef.current = io(`${SOCKET_SERVER_URL}/${namespace}`, {
            query: {
                roomId:postID,
            },
            // @ts-ignore
            extraHeaders:{...headers},
            withCredentials: true,
        });

        // @ts-ignore
        socketRef.current.on("test", msg => {
            console.log(msg)
        })

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            // @ts-ignore
            socketRef.current.disconnect();
        };
    }, [postID]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody:Object) => {
        console.log(messageBody)
        // socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        //     body: messageBody,
        //     senderId: socketRef.current.id,
        // });
    };

    return { messages, sendMessage, users };
};

export default WShelper;