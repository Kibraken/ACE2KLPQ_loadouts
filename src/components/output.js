import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useOvermind } from "../store";

const Output = ({ label, field }) => {
  const { state, actions } = useOvermind();
  const { Loadout } = state.Basic;
  console.log(field, label, Loadout[field]);
  if (!Loadout[field] || (Loadout[field] && !Loadout[field].length)) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <Label> {label} </Label>
        <CopyToClipboard
          text={JSON.stringify(Loadout[field]) + `;`}
          onCopy={() => actions.onCopy(label)}
        >
          <CopyBtn>{state.copied === label ? "Copied" : "Copy"}</CopyBtn>
        </CopyToClipboard>
      </Header>
      <Text>{JSON.stringify(Loadout[field]) + `;`}</Text>
    </Wrapper>
  );
};

export default Output;
const Label = styled.div`
  margin-right: 1em;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
`;
const Wrapper = styled.div`
  display: "flex";
  flex-flow: column;
  width: 100%;
  height: auto;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

const Text = styled.pre`
  background-color: #000014;
  height: 20px;
  width: 100%;
  padding: 0.6em;
  display: table-cell;
  vertical-align: middle;
  padding-left: 5px;
  font-weight: 400;
  color: white;
  font-size: ${props => (props.size ? `${props.size}px` : "inherit")};
  white-space: ${props => (props.wrap ? "normal" : "pre")};
`;

const CopyBtn = styled.button`
  color: whitesmoke;
  font-size: 0.6em;
  padding: 0.25em 0.55em;
  border: 2px solid whitesmoke;
  border-radius: 3px;
  background: transparent;
  text-transform: uppercase;
  font-weight: 500;
  width: max-content;
  margin: 1px;
  font-weight: 600;
  transition: 0.1s all;
  &:hover {
    background-color: white;
    color: #222222;
  }
`;
