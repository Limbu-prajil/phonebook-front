import React from 'react'

const Info = ({  id,name, number, handleDelete }) => {
  return (
    <div>
    <li> {name} {number} <button onClick={ ()=> handleDelete(id) }>Delete</button></li>
    </div>
  )
}

export default Info;