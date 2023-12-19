import styles from './BasicPongGame.module.scss'
import React, { useEffect, useRef, useState } from 'react'

interface DrawProps {
  x: number
  y: number
  width: number
  height: number
}

export default function BasicPongGameg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [height, setHeight] = useState<number>(window.innerHeight * 0.6)
  const [width, setWidth] = useState<number>(window.innerWidth * 0.7)
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')
  const raketColor = 'white'
  const canvasColor = '#71A1FF'
  const ballColor = 'white'

  function draw(myRacket?: DrawProps, rivalRacket?: DrawProps, ball?: DrawProps) {
    if (myRacket) {
      context.fillStyle = raketColor
      context.fillRect(myRacket.x, myRacket.y, myRacket.width, myRacket.height)
    }
    if (rivalRacket) {
      context.fillStyle = raketColor
      context.fillRect(rivalRacket.x, rivalRacket.y, rivalRacket.width, rivalRacket.height)
    }
    if (ball) {
      context.fillStyle = raketColor
      context.fillRect(ball.x, ball.y, ball.width, ball.height)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const grid = 10
    const paddleHeight = grid * 25 // 80
    const maxPaddleY = canvas.height - grid - paddleHeight

    var paddleSpeed = 10
    var ballSpeed = 10

    const leftPaddle = {
      // start in the middle of the game on the left side
      x: grid * 2,
      y: canvas.height / 2 - paddleHeight / 2,
      width: grid,
      height: paddleHeight,

      // paddle velocity
      dy: 0,
    }

    const rightPaddle = {
      // start in the middle of the game on the right side
      x: canvas.width - grid * 3,
      y: canvas.height / 2 - paddleHeight / 2,
      width: grid,
      height: paddleHeight,

      // paddle velocity
      dy: 0,
    }

    const ball = {
      // start in the middle of the game
      x: canvas.width / 2,
      y: canvas.height / 2,
      width: grid * 1.5,
      height: grid * 1.5,

      // keep track of when need to reset the ball position
      resetting: false,

      // ball velocity (start going to the top-right corner)
      dx: ballSpeed,
      dy: -ballSpeed,
    }

    function collides(obj1: any, obj2: any) {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      )
    }

    function loop() {
      requestAnimationFrame(loop)

      function calculateReflectionAngle(ball, paddle) {
        // 패들의 중심 계산
        const paddleCenter = paddle.y + paddle.height / 2

        // 공의 중심과 패들의 중심 사이의 거리 비율 계산
        const relativeIntersectY = ball.y + ball.height / 2 - paddleCenter
        const normalizedRelativeIntersectionY = relativeIntersectY / (paddle.height / 2)

        // 최대 반사 각도 지정
        const maxBounceAngle = Math.PI / 3 // 60도

        // 계산된 비율을 최대 반사 각도에 맞춰 적용하여 반사 각도 계산
        const bounceAngle = normalizedRelativeIntersectionY * maxBounceAngle

        return bounceAngle
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#71A1FF'

      context.fillRect(0, 0, canvas.width, canvas.height)
      // move paddles by their velocity
      leftPaddle.y += leftPaddle.dy
      rightPaddle.y += rightPaddle.dy

      // prevent paddles from going through walls
      if (leftPaddle.y < grid) {
        leftPaddle.y = grid
      } else if (leftPaddle.y > maxPaddleY) {
        leftPaddle.y = maxPaddleY
      }

      if (rightPaddle.y < grid) {
        rightPaddle.y = grid
      } else if (rightPaddle.y > maxPaddleY) {
        rightPaddle.y = maxPaddleY
      }

      // draw paddles
      context.fillStyle = 'white'
      context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)
      context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)

      // move ball by its velocity
      ball.x += ball.dx
      ball.y += ball.dy

      // prevent ball from going through walls by changing its velocity
      if (ball.y < grid) {
        ball.y = grid
        ball.dy *= -1
      } else if (ball.y + grid > canvas.height - grid) {
        ball.y = canvas.height - grid * 2
        ball.dy *= -1
      }

      // reset ball if it goes past paddle (but only if we haven't already done so)
      if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
        ball.resetting = true

        // give some time for the player to recover before launching the ball again
        setTimeout(() => {
          ball.resetting = false
          ball.x = canvas.width / 2
          ball.y = canvas.height / 2
          ball.dx = ballSpeed
          ball.dy = -ballSpeed
        }, 400)
      }

      if (collides(ball, leftPaddle)) {
        const reflectionAngle = calculateReflectionAngle(ball, leftPaddle)
        ball.dx = ballSpeed * Math.cos(reflectionAngle) * 1.1
        ball.dy = ballSpeed * Math.sin(reflectionAngle) * 1.1
        // move ball next to the paddle otherwise the collision will happen again
        // in the next frame
        ball.x = leftPaddle.x + leftPaddle.width
      } else if (collides(ball, rightPaddle)) {
        const reflectionAngle = calculateReflectionAngle(ball, rightPaddle)
        ball.dx = -ballSpeed * Math.cos(reflectionAngle) * 1.1
        ball.dy = ballSpeed * Math.sin(reflectionAngle) * 1.1
        // move ball next to the paddle otherwise the collision will happen again
        // in the next frame
        ball.x = rightPaddle.x - ball.width
      }

      // // check to see if ball collides with paddle. if they do change x velocity
      // if (collides(ball, leftPaddle)) {
      //   ball.dx *= -1.1
      //   // move ball next to the paddle otherwise the collision will happen again
      //   // in the next frame
      //   ball.x = leftPaddle.x + leftPaddle.width
      // } else if (collides(ball, rightPaddle)) {
      //   ball.dx *= -1.1

      //   // move ball next to the paddle otherwise the collision will happen again
      //   // in the next frame
      //   ball.x = rightPaddle.x - ball.width
      // }

      // draw ball

      context.fillRect(ball.x, ball.y, ball.width, ball.height)

      // draw walls
      context.fillStyle = 'lightgrey'
      context.fillRect(0, 0, canvas.width, grid)
      context.fillRect(0, canvas.height - grid, canvas.width, canvas.height)

      // draw dotted line down the middle
      for (let i = grid; i < canvas.height - grid; i += grid * 2) {
        context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid)
      }
    }

    document.addEventListener('keydown', function (e) {
      // up arrow key
      if (e.key === 'ArrowUp') {
        rightPaddle.dy = -paddleSpeed
      }
      // down arrow key
      else if (e.key === 'ArrowDown') {
        rightPaddle.dy = paddleSpeed
      }

      // w key
      if (e.key === 'w' || e.key === 'ㅈ') {
        leftPaddle.dy = -paddleSpeed
      }
      // a key
      else if (e.key === 's' || e.key === 'ㄴ') {
        leftPaddle.dy = paddleSpeed
      }
    })

    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        rightPaddle.dy = 0
      }
      if (e.key === 's' || e.key === 'w' || e.key === 'ㅈ' || e.key === 'ㄴ') {
        leftPaddle.dy = 0
      }
    })

    requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('keydown', () => {})
      document.removeEventListener('keyup', () => {})
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.pongGameCanvas}
    ></canvas>
  )
}
