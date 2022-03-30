import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {InterfaceWebsocketHeader} from "../Structures/InterfaceWebsocketHeader";
import {EnumWSpaths} from "../Structures/EnumWSpaths";

const SOCKET_SERVER_URL = "http://localhost:5000";
const WShelper = (namespace:string,postID:string|undefined, headers:InterfaceWebsocketHeader) => {
    const socketRef = useRef();
    useEffect(() => {
        if(namespace === EnumWSpaths.user && !headers.authorization) return
        // @ts-ignore
        socketRef.current = io(`${SOCKET_SERVER_URL}/${namespace}`, {query: {roomId:postID,},
            // @ts-ignore
            extraHeaders:{...headers},
            withCredentials: true,
        });
        // @ts-ignore
        socketRef.current.onAny((eventName, msg)=>{
            console.log(`eventName ${eventName}`)
            console.log(`msg ${msg}`)
        })
        return () => {
            // @ts-ignore
            socketRef.current.removeAllListeners();
            // @ts-ignore
            socketRef.current.disconnect();
        };
    }, [postID, headers, namespace]);

    const sendMessage = (messageBody:Object) => {
        console.log(messageBody)
        // socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        // });
    };

    return { socketRef };
};

export default WShelper;