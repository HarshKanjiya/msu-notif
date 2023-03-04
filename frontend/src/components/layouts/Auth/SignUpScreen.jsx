import React, { useState } from 'react'
import { Body, Btn, Footer, Header, TextF, Wrapper } from './auth.styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../../redux/thunk/userThunk';
import { CircularProgress } from '@mui/material';

const SignUpScreen = ({ screen, setScreen }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [visi, setVisi] = useState(false)
  const { loading } = useSelector((state => state.user))
  const dispatch = useDispatch()

  const HelperSubmit = () => {
    dispatch(registerThunk({ name, email, password: pass }))
  }

  return (
    <Wrapper
      key="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {
        loading ? (<CircularProgress />)
          :
          (
            <>
              <Header>SIGN UP</Header>
              <Body>
                <TextF
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  placeholder="name"
                />
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
                <Btn onClick={HelperSubmit} >SIGN UP</Btn>

                <div>
                  <p>Already have an Account ? <button className='btnn' onClick={() => { setScreen('login') }} >LOG IN</button></p>
                </div>
              </Footer>
            </>
          )
      }
    </Wrapper >
  )
}

export default SignUpScreen