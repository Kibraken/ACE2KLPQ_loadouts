import React from "react";
import {} from "../StyledComponents";
import styled, { keyframes } from "styled-components";
import { useOvermind } from "../store";
export const ModalWrap = styled.div`
  height: 100%;
  padding-right: ${props => (!props.save ? "10px" : "0px")};
`;

export const Mtitlewrap = styled.div`
  color: white;
  padding: 5px;
  border-bottom: ${props => (props.save ? "1px solid white" : "none")};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;
export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 87%;
  width: 900px;
  &:-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }
`;
export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ListItem = styled.div`
  display: grid;
  grid-template-rows: ${props => (props.selected ? "1fr 1fr" : "1fr")};
  grid-row-gap: 3px;
  margin-bottom: ${props => (props.selective ? "15px" : "0px")};
  grid-template-columns: 1fr 0.5fr 2fr 1fr 0.02fr;
  justify-content: center;
  align-content: center;
  background: ${props => (props.selected ? "#0b0710" : "transparent")};
  &:hover {
    background: ${props => (props.selective ? "#171d33" : "transparent")};
  }
  cursor: ${props => (props.selective ? "pointer" : "default")};
`;
export const ListField = styled.div`
  padding: 5px;
  border: 0.5px solid #929191;
  font-weight: 600;
  color: #ddeeff;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const ButtonLoad = styled.button`
  color: whitesmoke;
  font-size: 1em;
  margin: 0 10px;
  padding: 0.25em 1em;
  border: 2px solid whitesmoke;
  border-radius: 3px;
  background: transparent;
`;
export const BtnContainer = styled.div`
  grid-column: 4;
  display: flex;
  justify-content: space-around;
`;

export const ModalSaveWrap = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const InputsWrap = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
`;
export const InputContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const InputTitle = styled.p`
  margin: 0px;
  color: #ddeeff;
`;
export const Saveinput = styled.input`
  color: black;
  font-size: 1em;
  margin: 0.2em;
  padding: 0.25em 1em;
  border: ${props => (props.err ? "2px solid red" : "2px solid #ddeeff")};
  border-radius: 3px;
  background: #ddeeff;
`;
export const SaveBtnContainer = styled.div`
  grid-column: 4;
  display: flex;
  justify-content: flex-end;
  padding: 0 6%;
`;

export const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
export const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: fit-content;
`;
export const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;
export const Loader = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ErrMasg = styled.div`
  height: 25px;
  display: flex;
  align-items: flex-start;
  color: #f33636;
  font-weight: 600;
  padding-bottom: 5px;
`;
const Wrapp = styled.div`
  height: 500px;
  width: 500px;
  border: 1px solid white;
`;

const MissionList = () => {
  return (
    <ModalSaveWrap>
      <Mtitlewrap>save current loadout</Mtitlewrap>
      <InputsWrap>
        <InputContainer>
          <InputTitle>mission name</InputTitle>
        </InputContainer>
        <InputContainer>
          <InputTitle>date</InputTitle>
        </InputContainer>
        <InputContainer>
          <InputTitle>island name</InputTitle>
        </InputContainer>
      </InputsWrap>
    </ModalSaveWrap>
  );
};

const Missions = () => {
  const { state, actions } = useOvermind();
  return (
    <Wrapp>
      {/* {state.missions.map(i => (
        <MissionList />
      ))} */}
      <MissionList />
    </Wrapp>
  );
};

export default Missions;
