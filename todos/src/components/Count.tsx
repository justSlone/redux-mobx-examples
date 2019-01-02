import React from 'react'

export interface CountProps {
  count: number
}

const Count: React.SFC<CountProps> = ({ count }) => (
    <span>{count}</span>
)

export default Count
