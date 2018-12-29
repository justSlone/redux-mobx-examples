import React from 'react'
import PropTypes from 'prop-types'

const Count = ({ count }: {count: number}) => (
    <span>{count}</span>
)

Count.propTypes = {
  count: PropTypes.number.isRequired
}

export default Count
