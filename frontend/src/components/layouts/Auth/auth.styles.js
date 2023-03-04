import styled from "@emotion/styled";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
min-height: 60vh;
background-color: #151515;
margin: 1rem;
border-radius: 11px;
min-width: 45%;
max-width: max-content;
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:1.5rem;
box-shadow: 0 1.5rem 2rem rgba(0,0,0,0.3);

@media (max-width:700px){
    max-width: 95%;
    min-width: 95%;
}
`



export const Header = styled.div`
padding: 1rem 0;
font-size: 1.8rem;
font-weight: 600;

`
export const Body = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap:1rem;
padding: 1rem 0;
.passwrp{
    display: flex;
    align-items: flex-end;
    div{
        padding: 0 1rem;
    }
}
`
export const Footer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap:1rem;

.wrngform{
    width: 100%;
    display: flex;
    gap:1rem;
    justify-content: space-between;

}
.btnn{
    background-color: transparent;
    outline: none;
    border:none;
    color:#2bb594;
    padding: 0.5rem 1rem;

    &:hover{
        background-color: rgba(0,0,0,0.2);
        border-radius: 6px;
    }
}
`
export const TextF = styled.input`
width: 100%;
color:#2bb594;
padding: 1rem 0;
background-color: transparent;
border: none;
outline: none;
border-bottom: 2px solid #454545;
color:#fff;
font-size: 1rem;
&:hover, &:focus {
    border-bottom: 2px solid #2bb594;
}
`

export const Btn = styled(Button)`
padding: 1rem;
width: 100%;
background-color: #0da17d;
color:#252525;
font-weight: 600;

&:hover{
    background-color: #2bb594;
}
`