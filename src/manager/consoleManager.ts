import { time } from "console";
const date = new Date();

export function sendInfo(body: string) {

    console.log(
        "\x1b[1m[" + date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + "]\x1b[0m "
        +
         "\x1b[46mINFO\x1b[0m "
        +
        body
    )
}

export function sendDebug(body: string) {

    console.log(
        "\x1b[1m[" + date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + "]\x1b[0m "
        +
         "\x1b[45mDEBUG\x1b[0m "
        +
        body
    )
}

export function sendError(body: string) {

    console.log(
        "\x1b[1m[" + date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + "]\x1b[0m "
        +
         "\x1b[41mERROR\x1b[0m "
        +
        body
    )
}

export function sendConsole(body: string) {

    console.log(
        "\x1b[1m[" + date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + "]\x1b[0m "
        +
        body
    )
}

export default sendInfo;