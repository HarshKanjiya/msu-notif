import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import styled from "@emotion/styled"

const Screen = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)
    return (
        <Wrapper>
            <Header>Work Notifications</Header>
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

const Header = styled.div`
font-size: 1.6rem;
font-weight: 600;
`