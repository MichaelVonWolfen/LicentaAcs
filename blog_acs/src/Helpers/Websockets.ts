import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import {InterfaceWebsocketHeader} from "../Structures/InterfaceWebsocketHeader";
import {EnumWSpaths} from "../Structures/EnumWSpaths";
import {DefaultEventsMap} from "@socket.io/component-emitter";

const SOCKET_SERVER_URL = "http://localhost:5000";

interface WsSendEvent {
    msg: string | object,
    callback?: any
}

const WShelper = (namespace: string, postID: string, headers:any, events: any) => {
    let socketRef:any  =  null;
    useEffect(() => {
        if(namespace === EnumWSpaths.user && !headers.authorization) return
        socketRef = io(`${SOCKET_SERVER_URL}/${namespace}`, {query: {roomId:postID,},
            extraHeaders:{...headers},
            withCredentials: true,
        });
        // @ts-ignore
        socketRef.onAny((eventName, msg)=>{
            if(events[eventName])
                events[eventName](msg);
        })
        return () => {
            // @ts-ignore
            socketRef.removeAllListeners();
            // @ts-ignore
            socketRef.disconnect();
        };
    }, [postID, namespace]);

    const sendEvent = (eventName: string, message: { msg: string | undefined; callback?: (err: string, data: any) => void }) => {
        if (!socketRef) return
        socketRef.emit(eventName, message.msg, message.callback);
        console.log("Send event")
        console.log(eventName)
    };

    return { sendEvent, socketRef };
};

export default WShelper;