import { useEffect } from "react";
import io from "socket.io-client";
import {EnumWSpaths} from "../Structures/EnumWSpaths";
import constants from "../Config/constants";

const SOCKET_SERVER_URL = constants.BACKEND_URL;

interface WsSendEvent {
    msg: string | undefined,
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

    const sendEvent = (eventName: string, message: WsSendEvent) => {
        if (!socketRef) return
        socketRef.emit(eventName, message.msg, message.callback);
        console.log("Send event")
        console.log(eventName)
    };

    return { sendEvent, socketRef };
};

export default WShelper;