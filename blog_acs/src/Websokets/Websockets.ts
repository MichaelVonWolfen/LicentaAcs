import { useEffect } from "react";
import io from "socket.io-client";
import {EnumWSpaths} from "../Structures/EnumWSpaths";
import constants from "../Config/constants";

const SOCKET_SERVER_URL = constants.BACKEND_URL;

interface WsSendEvent {
    msg: string | undefined,
    callback?: any
}

const WShelper = (namespace: string, postID: string, headers:any, events: any, setSocket:any) => {
    useEffect(() => {
        let socketRef:any  =  null;
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
        setSocket(socketRef)
        return () => {
            // @ts-ignore
            socketRef.removeAllListeners();
            // @ts-ignore
            socketRef.disconnect();
        };
    }, [postID, namespace]);;
};

export default WShelper;