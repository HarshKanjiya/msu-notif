import styled from '@emotion/styled'
import React from 'react'
import Logo from "../../../assets/logo.png"
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { changeScreen } from '../../../redux/slices/nativeSlice';
import { Badge } from '@mui/material';
import { logOutThunk } from '../../../redux/thunk/userThunk';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo, isAuthenticated } = useSelector((state) => state.user)

    return (
        <Wrapper>
            <div>
                <img src={Logo} alt="" />
                <IconButton aria-label="notifications" onClick={() => { dispatch(changeScreen("notif")) }} >
                    <Badge badgeContent={userInfo && userInfo.notif ? userInfo.notif.length : 0} color="primary">
                        <MessageIcon />
                    </Badge>
                </IconButton>
                {
                    userInfo && userInfo.role === "admin" ?
                        (
                            <IconButton onClick={() => { dispatch(changeScreen("dashboard")) }} >
                                <AssignmentIcon />
                            </IconButton>
                        ) : null
                }
            </div>
            <div>
                <IconButton aria-label="log out" onClick={() => {
                    dispatch(logOutThunk({}))
                    navigate('/login')
                }} >
                    <LogoutIcon />
                </IconButton>
            </div>
        </Wrapper>
    )
}

export default SideBar

const Wrapper = styled.div`
width: 4.5rem;
height: 100%;
padding: 2rem 1rem;
background-color: rgba(0,0,0,0.1);
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border-right: 1px solid #121212;
box-shadow: 0 1rem 1.5rem rgba(0,0,0,0.2);

img{
    width: 100%;
}

div{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2rem;
}

@media (max-width:480px){
    width: 3.4rem;
}
`