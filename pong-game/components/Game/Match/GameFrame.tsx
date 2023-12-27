import { gameSocket } from '@/socket/gameSocket'
import styles from './GameFrame.module.scss'
import React, { useEffect, useRef } from 'react'
import { useMatchGameState, useMatchResultState } from '@/store/game'
import { useModalState } from '@/store/store'

interface DrawProps {
  x: number
  y: number
  dx?: number
  dy?: number
  radius?: number
  width: number
  height: number
}

interface MatchStatusData {
  myRacket: DrawProps
  rivalRacket: DrawProps
  ball: DrawProps
}

interface GameFrameProps {
  gameId: number
}

const canvasHeight = 800
const canvasWidth = 1200
const ballRadius = 10

export default function GameFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { matchGameState } = useMatchGameState()

  const keyDownEventHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      gameSocket.emit('matchKeyDown', {
        gameId: matchGameState.gameId,
        keyStatus: 'down',
        keyName: 'arrowDown',
      })
      console.log('arrowDown', 2)
    } else if (e.key === 'ArrowUp') {
      gameSocket.emit('matchKeyDown', {
        gameId: matchGameState.gameId,
        keyStatus: 'down',
        keyName: 'arrowUp',
      })
      console.log('arrowUp')
    }
  }
  const keyUpEventHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      gameSocket.emit('matchKeyDown', {
        gameId: matchGameState.gameId,
        keyStatus: 'up',
        keyName: 'arrowUp',
      })
      myRacket.dy = 0
    } else if (e.key === 'ArrowDown') {
      gameSocket.emit('matchKeyDown', {
        gameId: matchGameState.gameId,
        keyStatus: 'up',
        keyName: 'arrowDown',
      })
      myRacket.dy = 0
    }
  }

  const myRacket: DrawProps = {
    x: 10,
    y: canvasHeight / 2 - 100,
    dx: 0,
    dy: 0,
    width: canvasWidth * 0.01,
    height: canvasHeight * 0.25,
  }

  const rivalRacket: DrawProps = {
    x: canvasWidth - 10,
    y: canvasHeight / 2 - 100,
    dx: 0,
    dy: 0,
    width: canvasWidth * 0.01 * -1,
    height: canvasHeight * 0.25,
  }
  const ball: DrawProps = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    dx: 0,
    dy: 0,
    width: 20,
    height: 20,
    radius: 10,
  }

  const raketColor = 'white'
  const canvasColor = '#71A1FF'
  const ballColor = '#5c5d61'

  const matchStatusHandler = (data: MatchStatusData) => {
    myRacket.x = data.myRacket.x
    myRacket.y = data.myRacket.y
    // myRacket.width = data.myRacket.width
    // myRacket.height = data.myRacket.height
    rivalRacket.x = data.rivalRacket.x
    // rivalRacket.width = data.rivalRacket.width
    // rivalRacket.height = data.rivalRacket.height
    rivalRacket.y = data.rivalRacket.y
    ball.x = data.ball.x
    ball.y = data.ball.y
    // ball.radius = data.ball.radius
    // console.log(11111)
    // console.log(data)
  }

  const matchInitHandler = (data: MatchStatusData) => {
    console.log('gameFrame : serverGameReady')
    myRacket.x = data.myRacket.x
    myRacket.y = data.myRacket.y
    myRacket.width = data.myRacket.width
    myRacket.height = data.myRacket.height
    rivalRacket.x = data.rivalRacket.x
    rivalRacket.width = data.rivalRacket.width
    rivalRacket.height = data.rivalRacket.height
    rivalRacket.y = data.rivalRacket.y
    ball.x = data.ball.x
    ball.y = data.ball.y
    ball.radius = data.ball.radius
    // console.log('ball : ', ball)
    // console.log(22222)
    // console.log(data)
  }

  useEffect(() => {
    if (!canvasRef.current) return
    gameSocket.once('serverGameReady', matchInitHandler)

    setTimeout(() => {
      gameSocket.emit('gameRequest', { gameId: matchGameState.gameId })
      console.log('gameRequest')
    }, 1000)

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      //배경
      context.fillStyle = canvasColor
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'lightgrey'
      context.fillRect(canvas.width / 2 - 5, 0, 10, canvas.height)

      // 라켓
      context.fillStyle = raketColor
      context.fillRect(myRacket.x, myRacket.y, myRacket.width, myRacket.height)
      context.fillRect(rivalRacket.x, rivalRacket.y, rivalRacket.width, rivalRacket.height)

      // 공
      context.fillStyle = ballColor
      context.beginPath() // 경로 그리기 시작
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2) // 원 그리기
      context.fillStyle = ballColor // 공의 색상 지정
      context.fill() // 채우기
      context.closePath() // 경로 그리기 종료
    }, 500)

    gameSocket.on('matchStatus', matchStatusHandler)
    gameSocket.once('gameStart', () => {
      console.log('gameStart')
      function loop() {
        requestAnimationFrame(loop)

        //초기화
        context.clearRect(0, 0, canvas.width, canvas.height)

        //배경
        context.fillStyle = canvasColor
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
        // context.fillRect(ball.x, ball.y, ball.width, ball.height)
        context.beginPath() // 경로 그리기 시작
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2) // 원 그리기
        context.fillStyle = ballColor // 공의 색상 지정
        context.fill() // 채우기
        context.closePath() // 경로 그리기 종료

        // 라켓 이동 최댓값
        myRacket.y += myRacket.dy
        if (myRacket.y < 0) {
          myRacket.y = 0
        } else if (myRacket.y > canvas.height - myRacket.height) {
          myRacket.y = canvas.height - myRacket.height
        }

        return () => {
          gameSocket.off('matchStatus')
        }
      }

      //키 입력 이벤트 리스너

      document.addEventListener('keydown', keyDownEventHandler)
      // function (e) {

      document.addEventListener('keyup', keyUpEventHandler)
      const animationId = requestAnimationFrame(loop)

      return () => {
        document.removeEventListener('keydown', keyDownEventHandler)
        document.removeEventListener('keyup', keyUpEventHandler)
        gameSocket.off('matchStatus')
        cancelAnimationFrame(animationId)
        console.log('event listener removed')
      }
    })
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={styles.pongGameCanvas}
      ></canvas>
    </>
  )
}
