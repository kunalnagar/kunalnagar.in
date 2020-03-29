import React from 'react'
import styled from 'styled-components/macro'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

// const ButtonBase = ({ children, ...rest }: IButtonProps) => {
//   return (
//     <>
//       <button {...rest}>{children}</button>
//     </>
//   )
// }

export const Button = styled.button<IButtonProps>`
  border: 0;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background-color: ${(props) => props.theme.colors.blue[800]};

  &:hover {
    background-color: ${(props) => props.theme.colors.blue[900]};
  }
`
