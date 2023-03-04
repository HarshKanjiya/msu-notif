import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

const UserCard = ({ addID, removeID, user }) => {
  const { userInfo } = useSelector(state => state.user)
  return (
    <Wrapper>
      <div className='box' >
        <input className='in' type="checkbox" onChange={(e) => {
          if (e.target.checked) {
            addID(user._id)
          }
          else {
            removeID(user._id)
          }
        }} />
      </div>
      <div>
        <p>name: {user.name}
          {
            userInfo && userInfo._id === user._id &&
            (
              <span>
                YOU
              </span>
            )
          }
        </p>
        <p>role: {user.role}</p>
        <p>Pending Tasks: {user.notifs.length}</p>
      </div>
    </Wrapper>
  )
}

export default UserCard

const Wrapper = styled.div`
width: 100%;
border-radius: 9px;
box-shadow: 0 1.5rem 1.5rem rgba(0,0,0,0.1);
padding: 1rem;
border: 1px solid #121212;
display: flex;
gap:1rem;

.box{
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
span{
  margin: 0 1rem;
  padding: 0.2rem 0.5rem;
  color:#000;
  border-radius: 5px;
  background-color: #2bb594;
}
`