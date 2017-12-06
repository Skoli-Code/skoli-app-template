import { palette } from 'styled-theme' 
import Link from '../Link'

const Button = Link.extend`
  background-color: ${palette('primary', 0)};
`
export default Button
