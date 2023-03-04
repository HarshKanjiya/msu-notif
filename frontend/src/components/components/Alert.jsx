import swal from "sweetalert";

export const Alert = ({text='', icon='success', hasButton=false, timer='1500', title = 'Oops!'}) => {

  swal({
    text,
    title,
    icon,
    buttons:hasButton,
    timer,
  })

  
}
