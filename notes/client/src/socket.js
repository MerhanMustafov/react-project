import { io } from 'socket.io-client'

const socket = io(process.env.REACT_APP_SERVER_BASE_URL)
// const socket = io(process.env.REACT_APP_SERVER_BASE_URL_WS)

export {socket}