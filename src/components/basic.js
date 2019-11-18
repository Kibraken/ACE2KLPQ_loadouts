import React from "react";
import { useOvermind } from "../store";
import ModalDb from "../components/modal/modal";
import {
  Layout,
  Button,
  Buttons,
  TextArea,
  AmmoWrap,
  AmmoInput,
  AmmoLabel,
  AmmoForm
} from "../styles/basic";
import Output from "./output";

const Basic = () => {
  const { state, actions } = useOvermind();
  const { ExportArr, ammo } = state.Basic;
  return (
    <Layout>
      <ModalDb />
      <Buttons>
        <Button onClick={() => actions.modal("save")}>
          {" "}
          Save Current Loadout{" "}
        </Button>
        <Button onClick={() => actions.modal("load")}>
          {" "}
          Load Saved Loadout{" "}
        </Button>
      </Buttons>
      <TextArea
        placeholder={"place ACE export here"}
        onChange={e => actions.textAreaChangeBasic(e)}
        value={ExportArr}
      />
      <AmmoWrap>
        {/* Primary */}
        <AmmoForm>
          <AmmoLabel htmlFor="RifleMags">Rifle Mags</AmmoLabel>
          <AmmoInput
            type="number"
            id="RifleMags"
            value={ammo.RifleMags}
            min="1"
            max="50"
            onChange={e => actions.magsChange(e)}
          />
        </AmmoForm>
        {/* Sidearm */}
        <AmmoForm>
          <AmmoLabel htmlFor="SidearmMags">Sidearm Mags</AmmoLabel>
          <AmmoInput
            type="number"
            id="SidearmMags"
            value={ammo.SidearmMags}
            min="1"
            max="30"
            onChange={e => actions.magsChange(e)}
          />
        </AmmoForm>
        {/* Rockets */}
        <AmmoForm>
          <AmmoLabel htmlFor="RLrockets">RL rockets</AmmoLabel>
          <AmmoInput
            type="number"
            id="RLrockets"
            value={ammo.RLrockets}
            min="1"
            max="15"
            onChange={e => actions.magsChange(e)}
          />
        </AmmoForm>
      </AmmoWrap>
      <Button onClick={actions.basicConvert}>Convert</Button>
      <hr width="100%" />
      <Output label="Rifle" field="newRifle"></Output>
      <Output label="Launcher" field="newLauncher"></Output>
      <Output label="Handgun" field="newHandgun"></Output>
      <Output label="Uniform" field="newUniform"></Output>
    </Layout>
  );
};

export default Basic;
