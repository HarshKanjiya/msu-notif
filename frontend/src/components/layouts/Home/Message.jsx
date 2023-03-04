import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeScreen } from '../../../redux/slices/nativeSlice'

const Message = () => {
    const dispatch = useDispatch()


    return (
        <Wrapper>
            <Header>
                <button onClick={() => { dispatch(changeScreen("notif")) }} >ack</button>
            </Header>
        </Wrapper>
    )
}

export default Message

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