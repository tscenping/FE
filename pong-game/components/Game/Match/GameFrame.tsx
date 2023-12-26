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

interface MatchResultProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number // 상대 매치 점수
  myScore: number // 나의 매치 점수
  isWin: boolean // 승리 여부
  myRadderScore: number | null // 나의 래더 점수
  rivalRadderScore: number | null // 상대방 래더 점수
  gameType: 'NORMAL' | 'SPECIAL' | 'RADDER' // 진행했던 게임 타입
}

const canvasHeight = 800
const canvasWidth = 1200
const ballRadius = 10

export default function GameFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { matchGameState } = useMatchGameState()
  const { setMatchResultState } = useMatchResultState()
  const { setModalName } = useModalState()
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
      console.log(111)
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
    x: canvasWidth / 2 - 10,
    y: canvasHeight / 2 - 10,
    dx: 0,
    dy: 0,
    width: 20,
    height: 20,
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
    console.log(11111)
    console.log(data)
  }

  const matchInitHandler = (data: MatchStatusData) => {
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
    console.log('ball : ', ball)
    console.log(22222)
    console.log(data)
  }

  const matchEndHandler = (data: MatchResultProps) => {
    setMatchResultState(data)
    setModalName('matchResult')
  }

  useEffect(() => {
    if (!canvasRef.current) return
    gameSocket.emit('gameRequest', { gameId: matchGameState.gameId })
    gameSocket.once('serverGameReady', matchInitHandler)
    gameSocket.once('matchEnd', matchEndHandler)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
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
      requestAnimationFrame(loop)

      return () => {
        document.removeEventListener('keydown', keyDownEventHandler)
        document.removeEventListener('keyup', keyUpEventHandler)
        gameSocket.off('matchStatus')
        console.log('event listener removed')
      }
    })
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className={styles.pongGameCanvas}
    ></canvas>
  )
}

// // ball 변하는 값
// export type ball = {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   xVelocity: number // 속력: 속도 * 방향
//   yVelocity: number
//   accel: number // 새로운 판마다 증가
// }

// // racket 변하는 값
// export type racket = {
//   y: number
//   action: string // up, down
// }

// export class UpdateDto {
//   racketLeft: {
//     x: number
//     y: number
//   }
//   racketRight: {
//     x: number
//     y: number
//   }
//   ball: {
//     x: number
//     y: number
//   }
//   scoreLeft: boolean
//   scoreRight: boolean

//   isScoreChanged(): boolean {
//     return this.scoreRight || this.scoreRight
//   }
// }

// export class ViewMapDto {
//   ball: ball
//   ballSpeed: number
//   racketLeft: racket
//   racketRight: racket
//   racketSize: number
//   private updateDto: UpdateDto

//   constructor(
//     ballSpeed: number,
//     racketSize: number,

//     // 고정값
//     readonly canvasWidth = 1400,
//     readonly canvasHeight = 1000,

//     readonly ballRadius = 2,

//     readonly racketWidth = canvasWidth * 0.1,
//     readonly racketHeight = canvasHeight * 0.4,
//     readonly racketLeftX = 0,
//     readonly racketRightX = canvasWidth - racketWidth,
//     readonly racketSpeed = 6,

//     readonly deltaTime = 1 / 60,
//   ) {
//     this.updateDto = new UpdateDto()
//     this.ball.x = canvasWidth / 2
//     this.ball.y = canvasHeight / 2
//     this.ballSpeed = ballSpeed
//     this.ball.xVelocity = ballSpeed * (Math.random() < 0.5 ? 0 : 1) === 0 ? 1 : -1
//     this.ball.yVelocity = ballSpeed * (Math.random() < 0.5 ? 0 : 1) === 0 ? 1 : -1
//     this.ball.accel = 0

//     this.racketLeft.y = canvasHeight / 2 - racketHeight / 2
//     this.racketRight.y = canvasHeight / 2 - racketHeight / 2
//     this.racketSize = racketSize
//   }

//   async init() {
//     this.ball.vx = 0
//     this.ball.vy = 0
//     this.updateDto.scoreLeft = false
//     this.updateDto.scoreRight = false

//     this.ball.x = this.canvasWidth / 2
//     this.ball.y = this.canvasHeight / 2
//     this.ball.xVelocity = this.ballSpeed * (Math.random() < 0.5 ? 0 : 1) === 0 ? 1 : -1
//     this.ball.yVelocity = this.ballSpeed * (Math.random() < 0.5 ? 0 : 1) === 0 ? 1 : -1

//     this.ball.accel += 0.2
//     this.racketLeft.y = this.canvasHeight / 2 - this.racketHeight / 2
//     this.racketRight.y = this.canvasHeight / 2 - this.racketHeight / 2
//   }

//   private async updateBall() {
//     const ball = this.ball
//     const dt = this.deltaTime

//     // 공의 위치 업데이트
//     const x = ball.x + ball.xVelocity * dt + ball.accel * dt * dt * 0.5
//     const y = ball.y + ball.yVelocity * dt + ball.accel * dt * dt * 0.5
//     // 공의 속력 업데이트
//     ball.xVelocity += ball.accel * dt * (ball.xVelocity > 0 ? 1 : -1)
//     ball.yVelocity += ball.accel * dt * (ball.yVelocity > 0 ? 1 : -1)

//     this.ball.vx = x - ball.x
//     this.ball.vy = y - ball.y
//     this.ball.x = x
//     this.ball.y = y
//   }

//   updateRacketLeft(action: string) {
//     const racket = this.racketLeft

//     if (action === 'arrowUp') racket.y -= this.racketSpeed
//     else if (action === 'arrowDown') racket.y += this.racketSpeed

//     if (racket.y <= 0) racket.y = 0
//     if (racket.y + this.racketHeight >= this.canvasHeight)
//       racket.y = this.canvasHeight - this.racketHeight
//   }

//   updateRacketRight(action: string) {
//     const racket = this.racketRight

//     if (action === 'up') racket.y -= this.racketSpeed
//     else if (action === 'down') racket.y += this.racketSpeed

//     if (racket.y <= 0) racket.y = 0
//     if (racket.y + this.racketHeight >= this.canvasHeight)
//       racket.y = this.canvasHeight - this.racketHeight
//   }

//   async changes() {
//     const updateDto = this.updateDto
//     const ball = this.ball
//     await this.updateBall()

//     // racket, 천장, 바닥에 부딪히는지
//     await this.detectCollision()

//     //score
//     if (ball.x + this.ballRadius >= this.canvasWidth) updateDto.scoreRight = true // right
//     else if (ball.x - this.ballRadius <= 0) updateDto.scoreLeft = true // left

//     // 내보내기
//     updateDto.racketLeft = {
//       x: this.racketLeftX,
//       y: this.racketLeft.y,
//     }
//     updateDto.racketRight = {
//       x: this.racketRightX,
//       y: this.racketRight.y,
//     }
//     updateDto.ball = {
//       x: this.ball.x,
//       y: this.ball.y,
//     }

//     return updateDto
//   }

//   private async detectCollision() {
//     const ball = this.ball
//     let dx, dy

//     // 새로운 방향이 양수면 오른쪽 racket, 음수면 왼쪽 racket이랑 부딪히는지 검사
//     if (this.ball.vx > 0) {
//       dx = Math.abs(ball.x - this.getRacketRightCenter().cx)
//       dy = Math.abs(ball.y - this.getRacketRightCenter().cy)
//       if (
//         dx <= this.ballRadius + this.racketWidth / 2 &&
//         dy <= this.ballRadius + this.racketHeight / 2
//       )
//         ball.xVelocity *= -1
//     } else if (this.ball.vx < 0) {
//       dx = Math.abs(ball.x - this.getRacketLeftCenter().cx)
//       dy = Math.abs(ball.y - this.getRacketLeftCenter().cy)
//       if (
//         dx <= this.ballRadius + this.racketWidth / 2 &&
//         dy <= this.ballRadius + this.racketHeight / 2
//       )
//         ball.xVelocity *= -1
//     }

//     // 바닥, 천장
//     if (ball.y + this.ballRadius >= this.canvasHeight || ball.y - this.ballRadius <= 0)
//       ball.yVelocity *= -1
//   }

//   private getRacketLeftCenter() {
//     return {
//       cx: this.racketLeftX + this.racketWidth / 2,
//       cy: this.racketLeft.y + this.racketHeight / 2,
//     }
//   }

//   private getRacketRightCenter() {
//     return {
//       cx: this.racketRightX + this.racketWidth / 2,
//       cy: this.racketRight.y + this.racketHeight / 2,
//     }
//   }
// }
