import React, { useState } from 'react'

import Button from './UI/Button/Button'
import classes from './App.module.css'

const operations = ['+', '-', '*', '/']

const App = () => {
  const [valueState, setValueState] = useState('0')
  const [isFloat, setIsFloat] = useState(false)
  const [isChoosingControl, setIsChoosingControl] = useState(false)
  const [isResultCalculated, setIsResultCalculated] = useState(false)
  const [cache, setCache] = useState([])

  const valueHandler = (event) => {
    const value = event.target.innerHTML
    if (isChoosingControl) {
      setIsChoosingControl(false)
      setIsResultCalculated(false)
      return setValueState((prevState) => `${prevState} ${value}`)
    }
    if (valueState.length >= 15) {
      return
    }
    if (valueState === '0' || isResultCalculated) {
      setIsResultCalculated(false)
      return setValueState(value)
    }
    if (value === '.') {
      setIsFloat(true)
    }
    setValueState((prevState) => prevState + value)
  }

  const operationHandler = (event) => {
    setIsChoosingControl(true)
    setIsFloat(false)
    if (isChoosingControl) {
      setValueState((prevState) => prevState.replace(/[^0-9.]/g, ''))
    }
    const operation = event.target.innerHTML
    setValueState((prevState) => `${prevState} ${operation}`)
  }

  const getResultHandler = () => {
    let result = eval(valueState)
    if (result.toString().length >= 8) {
      result = result.toFixed(2)
    }
    setValueState(result)
    setCache((prevState) => {
      let arr = [...prevState]
      if (arr.length >= 5) {
        arr.shift()
      }
      return [...arr, `${valueState} = ${result}`]
    })
    setIsResultCalculated(true)
  }

  const onClearHandler = () => {
    setValueState('0')
    setIsFloat(false)
    setIsChoosingControl(false)
    setIsResultCalculated(false)
  }

  return (
    <div className={classes.App}>
      <div className={classes.result}>
        <div className={classes.cache}>
          {cache.map((item, i) => (
            <p key={`cache ${i}`} className={classes.cacheItem}>
              {item}
            </p>
          ))}
        </div>
        {valueState}
      </div>
      <div className={classes.calculator}>
        <div className={classes.numbers}>
          {[...Array(10)].map((item, i) => (
            <Button key={`button ${i}`} onClick={valueHandler}>
              {9 - i}
            </Button>
          ))}
          <Button onClick={valueHandler} isFloat={isFloat}>
            .
          </Button>
          <Button onClick={getResultHandler}>=</Button>
        </div>
        <div className={classes.operations}>
          {operations.map((item) => (
            <Button
              key={`operation ${item}`}
              btnType="operationBtn"
              onClick={operationHandler}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Button btnType="clearBtn" onClick={onClearHandler}>
        CLEAR
      </Button>
    </div>
  )
}

export default App
