import React, { useEffect, useState } from 'react'
import { Body, Btn, Footer, Header, TextF, Wrapper } from './auth.styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from '../../../redux/thunk/userThunk';
import { Alert } from '../../components/Alert';
import { clearErrors } from '../../../redux/slices/userSlice';
import { useNavigate } from "react-router-dom"
import { CircularProgress } from '@mui/material';

const LoginScreen = ({ screen, setScreen }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state => state.user))

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [visi, setVisi] = useState(false)

  const HelperSubmit = () => {
    dispatch(loginThunk({ email, password: pass }))
  }

  return (
    <Wrapper
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {
        loading ?
          (
            <CircularProgress />
          )
          :
          (
            <>
              <Header>Login</Header>
              <Body>
                <TextF
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Email"
                />
                <div className='passwrp' >
                  <TextF
                    type={visi ? "text" : "password"}
                    value={pass}
                    onChange={(e) => { setPass(e.target.value) }}
                    placeholder="Password"
                  />
                  <div onClick={() => { setVisi(!visi) }} >
                    {
                      visi ?
                        (<VisibilityIcon />)
                        :
                        (<VisibilityOffIcon />)
                    }
                  </div>

                </div>
              </Body>
              <Footer>
                <Btn onClick={HelperSubmit} >Log in</Btn>

                <div>
                  <p>Don't have an Account ? <button className='btnn' onClick={() => { setScreen('signup') }} >SIGN UP</button></p>
                </div>
              </Footer>
            </>
          )
      }
    </Wrapper>
  )
}

export default LoginScreen