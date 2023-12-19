import { gameSocket } from '@/socket/gameSocket'
import styles from './GameFrame.module.scss'
import React, { useEffect, useRef, useState } from 'react'

interface DrawProps {
  x: number
  y: number
  width: number
  height: number
}

interface MatchStatusData {
  myRacket: DrawProps
  rivalRacket: DrawProps
  ball: DrawProps
}

const height = 800
const width = 1200

export default function GameFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [myRacket, setMyRacket] = useState<DrawProps>({
    x: 0,
    y: height / 2 - 100,
    width: 15,
    height: 200,
  })

  const [rivalRacket, setRivalRacket] = useState<DrawProps>({
    x: width,
    y: height / 2 - 100,
    width: -15,
    height: 200,
  })
  const [ball, setBall] = useState<DrawProps>({
    x: width / 2 - 10,
    y: height / 2 - 10,
    width: 20,
    height: 20,
  })

  const raketColor = 'white'
  const canvasColor = '#71A1FF'
  const ballColor = 'white'

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    function loop() {
      requestAnimationFrame(loop)
      gameSocket.on('matchStatus', matchStatusHandler)
      //초기화
      context.clearRect(0, 0, canvas.width, canvas.height)

      //배경
      context.fillStyle = '#71A1FF'
      context.fillRect(0, 0, canvas.width, canvas.height)

      //중앙선
      context.fillStyle = 'lightgrey'
      context.fillRect(canvas.width / 2 - 5, 0, 10, canvas.height)

      // 라켓
      context.fillStyle = raketColor
      context.fillRect(myRacket.x, myRacket.y, myRacket.width, myRacket.height)
      context.fillRect(rivalRacket.x, rivalRacket.y, rivalRacket.width, rivalRacket.height)

      // 공
      context.fillStyle = ballColor
      context.fillRect(ball.x, ball.y, ball.width, ball.height)

      return () => {
        gameSocket.off('matchStatus')
      }
    }
    const matchStatusHandler = ({ myRacket, rivalRacket, ball }: MatchStatusData) => {
      setMyRacket(myRacket)
      setRivalRacket(rivalRacket)
      setBall(ball)
    }

    //키 입력 이벤트 리스너

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        gameSocket.emit('matchKeyDown', { gameId: 1, keyDown: 'down', keyName: 'arrowDown' })
      } else if (e.key === 'ArrowUp') {
        gameSocket.emit('matchKeyDown', { gameId: 1, keyDown: 'down', keyName: 'arrowUp' })
      }
    })

    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowUp') {
        // socket.emit('message', { channelId: channelId, message: messageRef.current.value })
        gameSocket.emit('matchKeyDown', { gameId: 1, keyDown: 'up', keyName: 'arrowUp' })
      } else if (e.key === 'ArrowDown') {
        // socket.emit('message', { channelId: channelId, message: messageRef.current.value })
        gameSocket.emit('matchKeyDown', { gameId: 1, keyDown: 'up', keyName: 'arrowDown' })
      }
    })
    requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('keydown', () => {})
      document.removeEventListener('keyup', () => {})
    }
  })
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.pongGameCanvas}
    ></canvas>
  )
}
