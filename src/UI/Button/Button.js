import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {
  return (
    <button
      className={`${classes.btn} ${classes[props.btnType]}`}
      onClick={props.onClick}
      disabled={props.children === '.' ? props.isFloat : null}
    >
      {props.children}
    </button>
  )
}

export default Button
