import io from 'socket.io-client';


// const ioProxy = {
//   autoConnect: false,
// };
// const ioCfg = {
//   isConnect: false,
// };
// const socket = io('ws://localhost:9101', ioProxy);
//
// socket.on('connect', () => {
//   ioCfg.isConnect = true;
// });
//
// socket.on('error', (error) => {
//   console.log(error);
// });
//
//
// socket.on('connect_error', (error) => {
//   console.log(error);
// });
//
// socket.on('connect_timeout', () => {
//
// });
//
// socket.on('disconnect', (reason) => {
//   console.log(reason);
//   ioCfg.isConnect = false;
// });
//
// export function open() {
//   if (!ioCfg.isConnect) {
//     socket.open();
//   }
// }
//
// export function dispath(msg, data) {
//   if (ioCfg.isConnect === false) {
//     socket.emit(msg, JSON.stringify(data));
//   }
// }

let socket = {
  socket : null
};

function getWebsocket(url) {
  console.log('websocket client', socket.socket);
  if (!socket.socket) {
    socket.socket = io(url, {isConnect: false});
  }
  return socket.socket;
}

export async function watchList(config, cb) {
  const client = getWebsocket(config.url);
  client.onopen = () => {
    client.send(JSON.stringify({type: 'login', ...config}));
  };
  // return client.onmessage = (data) => {
  //     cb(data);
  // };

  client.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data) {
      switch (data.type) {
        case 'ping':
          client.send('{"type":"pong"}');
          // cb(data);
          break;
        case 'login':
        case 'message':
          // cb(data);
          new Promise(function (resolve, reject) {
            return resolve({data});
          });
          break;
        // 用户退出 更新用户列表
        case 'logout':
          break;
      }
    }
  };
}


export async function send(config, data) {
  console.log('send', data);
  const websocket = getWebsocket(config.url);
  websocket.send(JSON.stringify(data));
}

export async function logout(config, code, reason) {
  const websocket = getWebsocket(config.url);
  websocket.close(code, reason);
}


