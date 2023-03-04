import React, { useEffect } from 'react'
import styled from "@emotion/styled"
import SideBar from '../layouts/Home/SideBar'
import Screen from '../layouts/Home/Screen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.user)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [])

  return (
    <Wrapper>
      <SideBar />
      <Screen />
    </Wrapper>
  )
}

export default HomePage

const Wrapper = styled.div`
display: flex;
width: 100%;
`