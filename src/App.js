import React, { useState } from 'react'

import Button from './UI/Button/Button'
import classes from './App.module.css'

import {
  OPERATIONS,
  EQUAL_SIGN,
  FLOATING_POINT,
  INITIAL_VALUE,
  NOT_NUMBER_SELECTOR,
  MAX_VALUE_LENGTH,
  MAX_RESULT_LENGTH,
  MAX_CACHE_LENGTH,
  OPERATION_BUTTON,
  CLEAR_BTN,
} from './constants/constants'

const App = () => {
  const [valueState, setValueState] = useState(INITIAL_VALUE)
  const [isFloat, setIsFloat] = useState(false)
  const [isChoosingControl, setIsChoosingControl] = useState(false)
  const [isResultCalculated, setIsResultCalculated] = useState(false)
  const [cache, setCache] = useState([])

  const changeValueHandler = (event) => {
    const value = event.target.innerHTML
    if (isChoosingControl) {
      setIsChoosingControl(false)
      setIsResultCalculated(false)
      return setValueState((prevState) => `${prevState} ${value}`)
    }
    if (valueState.length >= MAX_VALUE_LENGTH) {
      return
    }
    if (valueState === INITIAL_VALUE || isResultCalculated) {
      setIsResultCalculated(false)
      return setValueState(value)
    }
    if (value === FLOATING_POINT) {
      setIsFloat(true)
    }
    setValueState((prevState) => prevState + value)
  }

  const chooseOperationHandler = (event) => {
    setIsChoosingControl(true)
    setIsFloat(false)
    if (isChoosingControl) {
      setValueState((prevState) => prevState.replace(NOT_NUMBER_SELECTOR, ''))
    }
    const operation = event.target.innerHTML
    setValueState((prevState) => `${prevState} ${operation}`)
  }

  const calcResultHandler = () => {
    let result = eval(valueState)
    if (result.toString().length >= MAX_RESULT_LENGTH) {
      result = result.toFixed(2)
    }
    setValueState(result)
    setCache((prevState) => {
      let cache = [...prevState]
      if (cache.length >= MAX_CACHE_LENGTH) {
        cache.shift()
      }
      return [...cache, `${valueState} ${EQUAL_SIGN} ${result}`]
    })
    setIsResultCalculated(true)
  }

  const onClearHandler = () => {
    setValueState(INITIAL_VALUE)
    setIsFloat(false)
    setIsChoosingControl(false)
    setIsResultCalculated(false)
  }

  return (
    <div className={classes.app}>
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
            <Button key={`button ${i}`} onClick={changeValueHandler}>
              {9 - i}
            </Button>
          ))}
          <Button onClick={changeValueHandler} isFloat={isFloat}>
            {FLOATING_POINT}
          </Button>
          <Button onClick={calcResultHandler}>{EQUAL_SIGN}</Button>
        </div>
        <div className={classes.operations}>
          {OPERATIONS.map((item) => (
            <Button
              key={`operation ${item}`}
              btnType={OPERATION_BUTTON}
              onClick={chooseOperationHandler}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Button btnType={CLEAR_BTN} onClick={onClearHandler}>
        CLEAR
      </Button>
    </div>
  )
}

export default App
