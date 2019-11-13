import React, { useEffect } from "react";

import { useOvermind } from "../store";
import { SCa, SCb } from "../StyledComponents";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ModalDb from "../components/modal/modal";

const Checkbox = ({ className, checked, ...props }) => (
  <SCa.CheckboxContainer className={className}>
    <SCa.HiddenCheckbox checked={checked} {...props} />
    <SCa.StyledCheckbox checked={checked}>
      <SCa.Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </SCa.Icon>
    </SCa.StyledCheckbox>
  </SCa.CheckboxContainer>
);

const Advanced = () => {
  const { state, actions } = useOvermind();
  const {
    importArr,
    saveImport,
    classes,
    currentSelection,
    additionaloptions,
    sqfExport,
    showInfo
  } = state.Advanced;
  // useEffect(() => {
  // 	console.log('screen upd');
  // }, [state.upd]);
  //const forceUpdate = useCallback(() => updateState({}), []);
  return (
    <SCa.AdvancedMainWrap>
      <SCb.MdBtnWrap adv={true}>
        <SCb.BasicConvertBtn onClick={() => actions.modal("save")}>
          save current loadout
        </SCb.BasicConvertBtn>
        <SCb.BasicConvertBtn onClick={() => actions.modal("load")}>
          load saved loadout
        </SCb.BasicConvertBtn>
      </SCb.MdBtnWrap>
      <ModalDb />
      <SCa.InputWrap>
        <SCa.LoadInput
          placeholder={"place ACE export here"}
          onChange={e => actions.textAreaChangeAdv(e)}
          value={importArr}
        />

        <label>
          <Checkbox
            checked={saveImport}
            onChange={() => actions.saveThisimport()}
          />
          <SCa.CheckboxText>{`Save this input after convertion`}</SCa.CheckboxText>
        </label>

        <SCa.ClassInfoWrap>
          <SCa.ClassInfoHeader>Selected class information</SCa.ClassInfoHeader>
          <SCa.TextHeader>Ingame Class Name:</SCa.TextHeader>
          <SCa.ClassNameInput
            value={
              classes[currentSelection].className
                ? classes[currentSelection].className
                : undefined
            }
            onChange={e => actions.handleClassText(e)}
          ></SCa.ClassNameInput>
          {/* <SCa.TextHeader>Additional Class Tags:</SCa.TextHeader>
					<SCa.ClassTags
						value={classes[currentSelection].classTags}
						//onChange={e => this.handleText(e, 'class+')}
					></SCa.ClassTags> */}
        </SCa.ClassInfoWrap>
        <SCa.ClassCheckboxesWrap>
          <SCa.TextHeader>Additional class options:</SCa.TextHeader>
          {Object.keys(additionaloptions).map((i, index) => {
            return (
              <SCa.Lbl key={i} mrg={index === 3}>
                {index < 3 ? (
                  <React.Fragment>
                    <SCa.ClassInfoHeader>
                      {additionaloptions[i].fieldName}
                    </SCa.ClassInfoHeader>
                    <input
                      type="number"
                      value={additionaloptions[i].amount}
                      min="1"
                      max={
                        i === "rifleAmmo" ? 50 : i === "sidearmAmmo" ? 30 : 15
                      }
                      onChange={e =>
                        actions.handleNumInput([e.target.value, i, "amount"])
                      }
                    ></input>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Checkbox
                      checked={classes[currentSelection].classOptions[i]}
                      onChange={() => actions.handleCheckboxChange(i)}
                    />
                    <SCa.CheckboxText>
                      {additionaloptions[i].fieldName}
                      {"         "}
                    </SCa.CheckboxText>
                  </React.Fragment>
                )}
                {additionaloptions[i].type &&
                  classes[currentSelection].classOptions[i] && (
                    <input
                      value={additionaloptions[i].type}
                      onChange={e =>
                        actions.handleNumInput([e.target.value, i, "type"])
                      }
                    ></input>
                  )}
              </SCa.Lbl>
            );
          })}
        </SCa.ClassCheckboxesWrap>
        {classes[currentSelection].classOptions.converted &&
          (showInfo ? (
            <SCa.Plus
              size="25"
              title="Show converted loadout info"
              onClick={actions.showInfo}
            />
          ) : (
            <React.Fragment>
              <SCa.Minus
                size="25"
                title="Hide converted loadout info"
                onClick={actions.showInfo}
              />
              <SCb.OutputWrap>
                {classes[currentSelection].classLoadout.newRifle !==
                  undefined &&
                  classes[currentSelection].classLoadout.newRifle.length !==
                    0 && (
                    <SCb.Output>
                      <SCb.OutputHeader>
                        Rifle{" "}
                        <CopyToClipboard
                          text={
                            JSON.stringify(
                              classes[currentSelection].classLoadout.newRifle
                            ) + `;`
                          }
                          onCopy={() => actions.onCopy("Rifle")}
                        >
                          <SCb.BasicCopyBtn>
                            {state.copied == "Rifle" ? "Copied" : "Copy"}
                          </SCb.BasicCopyBtn>
                        </CopyToClipboard>
                      </SCb.OutputHeader>

                      <SCb.DefOutput size={11}>
                        {JSON.stringify(
                          classes[currentSelection].classLoadout.newRifle
                        ) + `;`}
                      </SCb.DefOutput>
                    </SCb.Output>
                  )}
                {classes[currentSelection].classLoadout.newLauncher !==
                  undefined &&
                  classes[currentSelection].classLoadout.newLauncher.length !==
                    0 && (
                    <SCb.Output>
                      <SCb.OutputHeader>
                        Secondary (Launcher){" "}
                        <CopyToClipboard
                          text={
                            JSON.stringify(
                              classes[currentSelection].classLoadout.newLauncher
                            ) + `;`
                          }
                          onCopy={() => actions.onCopy("Launcher")}
                        >
                          <SCb.BasicCopyBtn>
                            {state.copied == "Launcher" ? "Copied" : "Copy"}
                          </SCb.BasicCopyBtn>
                        </CopyToClipboard>
                      </SCb.OutputHeader>
                      <SCb.DefOutput size={11}>
                        {JSON.stringify(
                          classes[currentSelection].classLoadout.newLauncher
                        ) + `;`}
                      </SCb.DefOutput>
                    </SCb.Output>
                  )}
                {classes[currentSelection].classLoadout.newHandgun !==
                  undefined &&
                  classes[currentSelection].classLoadout.newHandgun.length !==
                    0 && (
                    <SCb.Output>
                      <SCb.OutputHeader>
                        Handgun{" "}
                        <CopyToClipboard
                          text={
                            JSON.stringify(
                              classes[currentSelection].classLoadout.newHandgun
                            ) + `;`
                          }
                          onCopy={() => actions.onCopy("Handgun")}
                        >
                          <SCb.BasicCopyBtn>
                            {state.copied == "Handgun" ? "Copied" : "Copy"}
                          </SCb.BasicCopyBtn>
                        </CopyToClipboard>
                      </SCb.OutputHeader>
                      <SCb.DefOutput size={11}>
                        {JSON.stringify(
                          classes[currentSelection].classLoadout.newHandgun
                        ) + `;`}
                      </SCb.DefOutput>
                    </SCb.Output>
                  )}
                {classes[currentSelection].classLoadout.newUniform !==
                  undefined &&
                  classes[currentSelection].classLoadout.newUniform.length !==
                    0 && (
                    <SCb.Output>
                      <SCb.OutputHeader>
                        Uniform{" "}
                        <CopyToClipboard
                          text={
                            JSON.stringify(
                              classes[currentSelection].classLoadout.newUniform
                            ) + `;`
                          }
                          onCopy={() => actions.onCopy("Uniform")}
                        >
                          <SCb.BasicCopyBtn>
                            {state.copied == "Uniform" ? "Copied" : "Copy"}
                          </SCb.BasicCopyBtn>
                        </CopyToClipboard>
                      </SCb.OutputHeader>
                      <SCb.DefOutput size={11}>
                        {JSON.stringify(
                          classes[currentSelection].classLoadout.newUniform
                        ) + `;`}
                      </SCb.DefOutput>
                    </SCb.Output>
                  )}
                {classes[currentSelection].exportUsed !== undefined &&
                  classes[currentSelection].exportUsed !== 0 && (
                    <SCb.Output hg={true}>
                      <SCb.OutputHeader>
                        ACE template used{" "}
                        <CopyToClipboard
                          text={classes[currentSelection].exportUsed}
                          onCopy={() => actions.onCopy("ACE")}
                        >
                          <SCb.BasicCopyBtn>
                            {state.copied == "ACE" ? "Copied" : "Copy"}
                          </SCb.BasicCopyBtn>
                        </CopyToClipboard>
                      </SCb.OutputHeader>
                      <SCb.DefOutput size={11} wrap={true}>
                        {classes[currentSelection].exportUsed}
                      </SCb.DefOutput>
                    </SCb.Output>
                  )}
              </SCb.OutputWrap>
            </React.Fragment>
          ))}
      </SCa.InputWrap>

      <SCa.ClassManagmentWrap>
        <SCa.SaveToClass onClick={() => actions.advConvert()}>
          convert ACE export and save to the selected class
        </SCa.SaveToClass>

        <SCa.ClassList>
          {Object.keys(classes).map(i => {
            return (
              <SCa.ClassWrap
                key={i}
                selected={classes[i].classOptions.isSelected}
                checked={classes[i].classOptions.isChecked}
                converted={classes[i].classOptions.converted}
                onClick={() => actions.handleClassSelection(i)}
              >
                <label>
                  <Checkbox
                    checked={classes[i].classOptions.isChecked}
                    onChange={e => actions.handleCheckboxChangeClass(e)}
                    id={i}
                  />
                </label>
                <SCa.CheckboxTextClass
                  checked={classes[i].classOptions.isChecked}
                  converted={classes[i].classOptions.converted}
                >
                  {classes[i].className}
                </SCa.CheckboxTextClass>
              </SCa.ClassWrap>
            );
          })}
          <SCa.AddNewClass onClick={() => actions.addNewRole()}>
            Add New Class
          </SCa.AddNewClass>
        </SCa.ClassList>
        <SCa.SaveToClass onClick={() => actions.fillAllRolesAtOnce()}>
          fill all selected roles with the current preset
        </SCa.SaveToClass>
      </SCa.ClassManagmentWrap>
      <SCa.AdvOutputWrap>
        <SCb.OutputHeader>Output</SCb.OutputHeader>
        <div>
          <SCa.Btn onClick={() => actions.exportToFile()}>
            {"export to file"}
          </SCa.Btn>
          <CopyToClipboard
            text={sqfExport}
            onCopy={() => actions.onCopy("exp")}
          >
            <SCa.Btn>
              {state.copied == "exp" ? "copied" : "Copy to clipboard"}
            </SCa.Btn>
          </CopyToClipboard>
          {/* <SCa.Btn onClick={actions.resetConverter}>reset converter</SCa.Btn> */}
        </div>

        <SCa.PreOutput>
          {state.err.expNotAllConv ? state.err.expNotAllConv : sqfExport}
        </SCa.PreOutput>
      </SCa.AdvOutputWrap>
    </SCa.AdvancedMainWrap>
  );
};

export default Advanced;
