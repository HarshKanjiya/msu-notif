import styled from '@emotion/styled'
import React from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { changeScreen } from '../../redux/slices/nativeSlice'
import { markThunk } from '../../redux/thunk/userThunk'

const NotifCard = ({ notif, index }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)

    const HelperMark = () => {
        if (notif.seen) {
            dispatch(markThunk({ notifID: notif._id, subject: notif.subject, message: notif.message, userID: userInfo._id, seen: false }))
        }
        else {
            dispatch(markThunk({ notifID: notif._id, subject: notif.subject, message: notif.message, userID: userInfo._id, seen: true }))
        }
    }

    return (
        <Wrapper seen={notif && notif.seen}
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 * (index) }}
        >
            <div className='qwert' >
                <div className='index' >
                    {index}
                </div>
                <div>
                    <p> Subject: {notif && notif.subject}</p>
                    <p> Message:</p>
                    <p> {notif && notif.message}</p>
                </div>
            </div>
            <div className='qaz'>
                <button onClick={HelperMark} >{notif && notif.seen ? "Mark As unRead" : "Mark As Read"}</button>
            </div>
        </Wrapper>
    )
}

export default NotifCard

const Wrapper = styled(motion.div)`
display: flex;
padding: 1rem;
cursor: pointer;
border-radius: 9px;
justify-content: space-between;
gap:1rem;
background-color: ${props => (props.seen ? "transparent" : "rgba(255,255,255,0.10)")};
transition: 300ms;

@media (max-width:500px){
flex-direction: column ;
.qaz{
    width: 100%;
    display: flex;
    justify-content: end;
}
}

.qwert{
    display: flex;
    gap:1rem;
}
.index{
    font-size: 1.2rem;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
button{
    background-color: #2bb594;
    outline:none;
    cursor: pointer;
    border:none;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
}
`