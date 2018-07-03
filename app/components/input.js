import React, { Component } from 'react'

export default class Input extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {
    return (
      <div>
        <label> { this.props.label } </label>
        <input type={ this.props.type }
          id={ this.props.id }
          style={ this.props.style }
          onChange={ e => this.props.onChange(e) }
          value={ this.props.value }
          placeholder={ this.props.placeholder } />
      </div>
    )
  }
}