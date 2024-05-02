import { Server } from 'socket.io';

export class connectionSocket {

    static on(server: any) {

        const io = new Server(server);

        return io
    }
}
