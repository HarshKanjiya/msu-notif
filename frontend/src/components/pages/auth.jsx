import React, { useEffect, useState } from 'react'
import LoginScreen from '../layouts/Auth/LoginScreen'
import SignUpScreen from '../layouts/Auth/SignUpScreen'
import styled from "@emotion/styled"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '../components/Alert'
import { clearErrors } from '../../redux/slices/userSlice'
import { useNavigate } from "react-router-dom"


const Auth = () => {
    const [screen, setScreen] = useState('login')
    const { userInfo, loading, error } = useSelector((state => state.user))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error && error !== "err123") {
            Alert({
                text: error,
                icon: "error"
            })
            dispatch(clearErrors())
        }
        if (error && error === "err123") dispatch(clearErrors())
        if (userInfo !== null) {
            navigate('/')
        }
    }, [error, userInfo])
    return (
        <Wrapper>

            <AnimatePresence mode="wait">
                {
                    screen === "login" ?
                        (<LoginScreen screen={screen} key="login" setScreen={setScreen} />)
                        :
                        (<SignUpScreen screen={screen} key="signup" setScreen={setScreen} />)
                }
            </AnimatePresence>
        </Wrapper>
    )
}

export default Auth

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

background-color:#ffe799;
background-image:
radial-gradient(at 67% 89%, hsla(87,87%,73%,1) 0px, transparent 50%),
radial-gradient(at 85% 37%, hsla(146,74%,74%,1) 0px, transparent 50%),
radial-gradient(at 15% 44%, hsla(306,86%,68%,1) 0px, transparent 50%),
radial-gradient(at 42% 87%, hsla(312,65%,75%,1) 0px, transparent 50%),
radial-gradient(at 84% 22%, hsla(97,63%,63%,1) 0px, transparent 50%),
radial-gradient(at 53% 50%, hsla(105,61%,60%,1) 0px, transparent 50%),
radial-gradient(at 12% 15%, hsla(215,89%,64%,1) 0px, transparent 50%);

`
