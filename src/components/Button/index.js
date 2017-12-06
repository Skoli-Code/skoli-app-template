import { palette } from 'styled-theme' 
import Link from '../Link'

const Button = Link.extend`
  padding: 10px 15px;
  height: 30px;
  color: ${palette('gray', 0)};
  background-color: ${palette('primary', 0)};
  transition: background-color .3s ease;
  &:hover {
    background-color: ${palette('primary', 1)};
  }
`
export default Button
