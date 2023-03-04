import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import { adminGetUsersThunk, AssignTaskThunk } from '../../../redux/thunk/userThunk'
import UserCard from '../../components/userCard'

import SendIcon from '@mui/icons-material/Send';
import { CircularProgress } from '@mui/material'
import { Alert } from '../../components/Alert'
import { clearMsg, clearNativeErr } from '../../../redux/slices/nativeSlice'

const AdminScreen = () => {

  const dispatch = useDispatch()
  const { users, nativeLoading, error, msg } = useSelector(state => state.native)
  const { userInfo } = useSelector(state => state.user)

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const [userIDs, setList] = useState([])


  useEffect(() => {
    dispatch(adminGetUsersThunk({}))
  }, [])


  useEffect(() => {
    if (error) {
      Alert({
        icon: "error",
        text: "Something went wrong"
      })
      dispatch(clearNativeErr())
    }
    if (msg) {
      Alert({
        text: msg
      })
      dispatch(clearMsg())
    }

  }, [error, msg])

  const addID = (id) => {
    setList([...userIDs, id])
  }
  const removeID = (id) => {
    let temp = userIDs.filter((i) => i !== id)
    setList(temp)
  }

  const HelperSubmit = () => {
    if (userIDs.length < 1) {
      Alert({
        icon: "error",
        text: "Chose any user first!"
      })
      return
    }
    if (subject.trim() === '' || message.trim() === '') {
      Alert({
        icon: "error",
        text: "can not send Empty Fields"
      })
      return
    }
    dispatch(AssignTaskThunk({ userIDs, subject, message, userID: userInfo._id }))
  }



  return (
    <Wrapper
      key="admin">
      {
        nativeLoading ?
          (<Loader><CircularProgress /></Loader>)
          :
          (

            <>
              <Header>
                Assign Task
              </Header>

              <Notif>
                <p>Write down new Task</p>
                <TextF type="text" placeholder='subject' maxLength={30} value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                <TextA type="text" placeholder='Task' rows={5} value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <button onClick={HelperSubmit} ><p>SEND</p> <SendIcon fontSize='small' /> </button>
              </Notif>


              <Body>
                <p>Assign User</p>
                {
                  users.map((user, index) => {
                    return (
                      <UserCard addID={addID} removeID={removeID} key={index} user={user} />
                    )
                  })
                }
              </Body>
            </>

          )
      }


    </Wrapper>
  )
}

export default AdminScreen

const Loader = styled.div`
width: 100%;
height:80vh;
display: flex;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
width: 100%;
padding: 2rem 1rem;
display: flex;
flex-direction: column;
gap:1rem;

`

const Header = styled.div`
font-size: 1.6rem;
font-weight: 600;
`
const Body = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap:1rem;
`

const Notif = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap:1rem;
padding: 1rem;
border: 1px solid #121212;
border-radius: 9px;

button{
  padding: 0.7rem 1rem;
  max-width: max-content;
  background-color: #2bb594;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
`

const TextF = styled.input`
width: 100%;
color:#2bb594;
padding: 1rem 0;
background-color: transparent;
border: none;
outline: none;
border-bottom: 2px solid #454545;
color:#fff;
font-size: 1rem;
&:hover, &:focus {
    border-bottom: 2px solid #2bb594;
}
`
const TextA = styled.textarea`
width: 100%;
color:#2bb594;
padding: 1rem 0;
background-color: transparent;
border: none;
outline: none;
border-bottom: 2px solid #454545;
color:#fff;
font-size: 1rem;
&:hover, &:focus {
    border-bottom: 2px solid #2bb594;
}
`