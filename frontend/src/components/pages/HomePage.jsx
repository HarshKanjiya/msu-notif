import React, { useEffect } from 'react'
import styled from "@emotion/styled"
import SideBar from '../layouts/Home/SideBar'
import Screen from '../layouts/Home/Screen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminScreen from '../layouts/Home/adminScreen'
import { motion } from "framer-motion"
import Message from '../layouts/Home/Message'

const HomePage = () => {
  const dispatch = useDispatch()
  const { screen } = useSelector(state => state.native)



  return (
    <Wrapper>
      <SideBar />
      {
        screen === "notif" ? (
          <motion.div
            key="notif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%", height: "100%", overflow: "auto" }} >
            <Screen />
          </motion.div>
        ) : null
      }
      {
        screen === "dashboard" ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%", height: "100%", overflow: "auto" }} >
            <AdminScreen />
          </motion.div>
        ) : null
      }
      {
        screen === "message" ? (
          <motion.div
            key="notif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%", height: "100%", overflow: "auto" }} >
            <Message />
          </motion.div>
        ) : null
      }

    </Wrapper >
  )
}

export default HomePage

const Wrapper = styled.div`
display: flex;
width: 100%;
`