import styled from 'styled-components';

export const DropdownMenu = styled.div`
  position: absolute;
  inset: 35px auto auto -150px;
  margin: 0;
  transform: translate(0px, 5px);
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  padding: 0.5rem;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  display: block;
  color: ${(props) => props.theme.colors.buttonConnectedText};
  cursor: pointer;
  text-decoration: none;
  padding: 0.25rem 1rem;
  white-space: nowrap;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;
