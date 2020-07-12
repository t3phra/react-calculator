import React, { useState } from 'react'

import Button from './UI/Button/Button'
import classes from './App.module.css'

const operations = ['+', '-', 'x', '/']

const App = () => {
  const [valueState, setValueState] = useState('0')
  const [isFloat, setIsFloat] = useState(false)

  const operationHandler = (operation) => {}

  const valueHandler = (event) => {
    const value = event.target.innerHTML
    if (valueState.length >= 8) {
      return
    }
    if (valueState === '0') {
      return setValueState(value)
    }
    if (value === '.') {
      setIsFloat(true)
    }
    setValueState((prevState) => prevState + value)
  }

  const onClearHandler = () => {
    setValueState('0')
    setIsFloat(false)
  }

  return (
    <div className={classes.App}>
      <div className={classes.result}>{valueState}</div>
      <div className={classes.calculator}>
        <div className={classes.numbers}>
          {[...Array(10)].map((item, i) => (
            <Button
              key={`button ${i}`}
              onClick={valueHandler}
              isFloat={isFloat}
            >
              {9 - i}
            </Button>
          ))}
          <Button onClick={valueHandler}>.</Button>
          <Button>=</Button>
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
