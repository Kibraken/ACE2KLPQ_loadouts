import styled from "styled-components";

export const BasicWrapper = styled.div`
  background: #222222;
  border: 1px solid white;
  max-width: 1850px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
export const OutputWrap = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding-left: 10px;
  width: fit-content;
  /* height: 180px; */
  margin-top: 20px;
`;

export const DefaultInput = styled.textarea`
  width: 99.6%;
  height: 150px;
  margin-top: 25px;
`;

export const RifleMagsInput = styled.input`
  width: 35px;
`;
export const SidearmMagsInput = styled.input`
  width: 35px;
`;
export const RocketsInput = styled.input`
  width: 35px;
`;

export const MagsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;
export const Mags = styled.div`
  margin: 20px 0;
  margin-left: 20px;
`;

export const DefOutput = styled.pre`
  background: transparent;
  height: 20px;
  width: 100%;
  display: table-cell;
  vertical-align: middle;
  padding-left: 5px;
  font-weight: 400;
  color: white;
  font-size: ${props => (props.size ? `${props.size}px` : "inherit")};
  white-space: ${props => (props.wrap ? "normal" : "pre")};
  /* font-size: 11px; */
`;
export const Output = styled.div`
  display: "flex";
  flex-flow: column;
  width: 100%;
  height: ${props => (props.hg ? `auto` : "42px")};
`;
export const OutputHeader = styled.div`
  font-weight: 600;
  color: white;
`;

export const BasicLbl = styled.label`
  color: white;
`;
export const BasicConvertBtn = styled.button`
  color: whitesmoke;
  font-size: 1em;
  /* margin: 1em; */
  padding: 0.25em 1em;
  border: 2px solid whitesmoke;
  border-radius: 3px;
  background: transparent;
  width: max-content;
  margin: 3px;
`;

export const MdBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const BasicCopyBtn = styled.button`
  color: whitesmoke;
  font-size: 0.6em;
  padding: 0.25em 0.55em;
  border: 2px solid whitesmoke;
  border-radius: 3px;
  background: transparent;
  width: max-content;
  margin: 1px;
  font-weight: 600;
`;
