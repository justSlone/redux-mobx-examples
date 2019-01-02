import React from 'react'

export interface LinkProps {
  active: boolean
  children: JSX.Element
  onClick: ()=> void
}

const Link: React.SFC<LinkProps> = ({ active, children, onClick }) => (
    <button
       onClick={onClick}
       disabled={active}
       style={{
           marginLeft: '4px',
       }}
    >
      {children}
    </button>
)

export default Link
