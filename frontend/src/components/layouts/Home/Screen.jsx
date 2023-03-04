import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import styled from "@emotion/styled"
import NotifCard from '../../components/NotifCard'
import { markAllThunk } from '../../../redux/thunk/userThunk'

const Screen = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)

    const Helper = () => {
        dispatch(markAllThunk({ userID: userInfo._id, seen: true }))
    }
    return (
        <Wrapper>
            <Header>Work Notifications</Header>
            <Tops> <button onClick={Helper} >Mark all as Read</button> </Tops>
            <Body>
                {
                    userInfo &&
                    userInfo.notifs.map((notif, index) => <NotifCard key={index} notif={notif} index={index + 1} />)
                }
            </Body>
        </Wrapper>
    )
}

export default Screen

const Wrapper = styled.div`
width: 100%;
padding: 2rem 1rem;
display: flex;
flex-direction: column;
gap:1rem;
`
const Tops = styled.div`
display: flex;
width: 100%;
justify-content: space-between;

button {
    background-color: #2bb594;
    color:#fff;
    padding: 0.2rem 0.5rem;
    border-radius: 7px;
}
`

const Header = styled.div`
font-size: 1.6rem;
font-weight: 600;

@media (max-width:500px){
    font-size: 1.2rem;
}
@media (max-width:800px){
    font-size: 1.4rem;
}
`

const Body = styled.div`
display: flex;
width: 100%;
flex-direction: column;
gap:1rem;

@media (max-width:600px){
    gap:0.6rem;
}

`