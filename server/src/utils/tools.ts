import * as net from 'net'

export function isPortOccupied(port: number, address: string): Promise<number> {
  const server = net.createServer().listen(port, address)
  return new Promise((resolve, reject) => {
    // 如果监听成功，表示端口没有被其他服务占用，端口可用，取消监听，返回端口给调用者。
    server.on('listening', () => {
      server.close()
      resolve(port)
    })
    // 如果监听出错，端口+1，继续监听，直到监听成功。
    server.on('error', async (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(isPortOccupied(port + 1, address))
      } else {
        reject(err)
      }
    })
  })
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function getDistance(lat1, lng1, lat2, lng2) {
  lat1 = lat1 || 0
  lng1 = lng1 || 0
  lat2 = lat2 || 0
  lng2 = lng2 || 0

  const rad1 = (lat1 * Math.PI) / 180.0
  const rad2 = (lat2 * Math.PI) / 180.0
  const a = rad1 - rad2
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  const r = 6378137
  const distance =
    r *
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)
      )
    )

  return distance
}
