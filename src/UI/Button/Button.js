import React from 'react'
import classNames from 'classnames'

import classes from './Button.module.css'

const Button = (props) => {
  return (
    <button
      className={classNames(classes.btn, classes[props.btnType])}
      onClick={props.onClick}
      disabled={props.children === '.' && props.isFloat}
    >
      {props.children}
    </button>
  )
}

export default Button
