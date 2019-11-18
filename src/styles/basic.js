import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  padding: 1em;
  max-width: 1850px;
  background-color: #222222;
  grid: 1fr / 1fr;
  grid-gap: 1em;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Button = styled.div`
  color: whitesmoke;
  font-size: 1em;
  /* margin: 1em; */
  padding: 0.25em 1em;
  border: 2px solid whitesmoke;
  border-radius: 3px;
  background: transparent;
  width: max-content;
  margin: 3px;
  transition: 0.1s all;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #222222
  }
`;

const TextArea = styled.textarea`
  width: 99.6%;
  height: 150px;
`;

const AmmoWrap = styled.div``;

const AmmoInput = styled.input`
  width: 35px;
`;

const AmmoForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-bottom: 1em;
`;

const AmmoLabel = styled.label`
  font-weight: 600;
  padding-right: 1em;
  color: #ddd;
`;

export {
  Layout,
  Button,
  Buttons,
  TextArea,
  AmmoInput,
  AmmoLabel,
  AmmoWrap,
  AmmoForm
};
