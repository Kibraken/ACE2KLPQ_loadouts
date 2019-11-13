import { ParseLoadout } from "../misc/parsConverter";
import { sqfExport } from "../sqfExport";
import { default as initState } from "./state";

export const switchScreen = ({ state }, screen) => (state.Screen = screen);

/*---------------------------BASIC------------------------------------------*/

export const textAreaChangeBasic = ({ state }, event) => {
  // let txt = await JSON.parse(event.target.value);
  // state.Basic.ExportArr = txt;

  try {
    state.Basic.ExportArr = JSON.parse(JSON.stringify(event.target.value));
  } catch (error) {
    console.log("error in textAreaChangeBasic", error);
    state.Basic.ExportArr = event.target.value;
  }
};

export const magsChange = ({ state }, event) =>
  (state.Basic.ammo[event.currentTarget.id] =
    event.target.value !== "" ? parseInt(event.target.value) : 1);

export const basicConvert = async ({ state }) => {
  // const convert = await new ParseLoadout(
  // 	state.Basic.ExportArr,
  // 	state.Basic.ammo
  // );
  // state.Basic.Loadout = await convert.convertFn();
  let { ExportArr, ammo } = state.Basic;
  try {
    ExportArr = JSON.parse(ExportArr);
    if (typeof ExportArr !== "object") throw new Error("not an array");
  } catch (error) {
    return console.log("something wrong with the import", error);
  }

  const convert = await new ParseLoadout(ExportArr, ammo);
  state.Basic.Loadout = await convert.convertFn();
};

/*---------------------------ADV------------------------------------------*/
export const textAreaChangeAdv = ({ state }, event) => {
  try {
    state.Advanced.importArr = JSON.parse(JSON.stringify(event.target.value));
  } catch (error) {
    console.log("error in textAreaChangeAdv", error);
    state.Advanced.importArr = event.target.value;
  }
};
export const saveThisimport = ({ state }) =>
  (state.Advanced.saveImport = !state.Advanced.saveImport);

export const handleClassText = ({ state }, event) => {
  //refactor
  //todo check for unique name
  let txt = event.target.value;
  let { currentSelection } = state.Advanced;
  let classes = { ...state.Advanced.classes };
  classes[currentSelection].className = txt.length === 0 ? "_" : txt;
  state.Advanced.classes = classes;
  //todo additional tags for classes
};

export const handleNumInput = ({ state }, value) => {
  let num = value[0],
    name = value[1],
    type = value[2];
  let additionaloptions = { ...state.Advanced.additionaloptions };
  if (type === "amount") {
    additionaloptions[name][type] =
      num !== "" || num !== NaN ? parseInt(num) : 1;
  } else {
    additionaloptions[name][type] = num !== "" ? num : "_";
  }
  state.Advanced.additionaloptions = additionaloptions;
};
export const handleCheckboxChange = ({ state }, id) => {
  let { currentSelection, classes } = state.Advanced;
  classes[currentSelection].classOptions[id] = !classes[currentSelection]
    .classOptions[id];
};

export const handleCheckboxChangeClass = ({ state }, event) => {
  let { classes } = state.Advanced;
  let id = event.currentTarget.id;
  classes[id].classOptions.isChecked = !classes[id].classOptions.isChecked;
};

export const handleClassSelection = ({ state }, id) => {
  let { classes, currentSelection } = state.Advanced;

  classes[id].classOptions.isSelected = true;
  classes[currentSelection].classOptions.isSelected = false;

  state.Advanced.currentSelection = id;
};

export const addNewRole = ({ state }) => {
  let { classes } = state.Advanced;
  let num = Object.keys(classes).length - 11; //i hope initial length will be static

  classes[`CustomRole${num}`] = {
    className: "",
    classTags: [],
    classLoadout: {},
    classOptions: {
      binocular: false,
      gps: true,
      radioSq: true,
      radioFt: true,
      isSelected: false,
      isChecked: true,
      mgMags: false,
      converted: false,
      nvg: false,
      map: false,
      compass: false
    },
    exportUsed: false
  };
  classes[`CustomRole${num}`].className = `CustomRole${num}`;
};

export const advConvert = async ({ state }, Selected) => {
  let classes = { ...state.Advanced.classes };
  let {
    additionaloptions,
    importArr,
    currentSelection,
    saveImport
  } = state.Advanced;
  if (Selected && !classes[Selected].classOptions.isChecked) return;
  if (Selected) currentSelection = Selected;
  try {
    importArr = JSON.parse(importArr);
    if (typeof importArr !== "object") throw new Error("not an array");
  } catch (error) {
    return console.log("something wrong with the import", error);
  }

  let ammo = {
    RifleMags: additionaloptions.rifleAmmo.amount,
    SidearmMags: additionaloptions.sidearmAmmo.amount,
    RLrockets: additionaloptions.rockets.amount
  };
  const convert = await new ParseLoadout(importArr, ammo);
  classes[currentSelection].classLoadout = await convert.convertFn();
  classes[currentSelection].classOptions.converted = true;
  if (classes[currentSelection].classOptions.nvg)
    classes[currentSelection].classOptions.nvg = additionaloptions.nvg.type;
  if (classes[currentSelection].classOptions.binocular)
    classes[currentSelection].classOptions.binocular =
      additionaloptions.binocular.type;
  classes[currentSelection].exportUsed = state.Advanced.importArr;
  if (saveImport === true) {
    state.Advanced.classes = classes;
  } else {
    state.Advanced.classes = classes;
    state.Advanced.importArr = "";
  }
};
export const clearexperr = ({ state }) => {
  delete state.err["expNotAllConv"];
};
export const exportToFile = async ({ state, actions }) => {
  let exportObj = {};
  let classes = { ...state.Advanced.classes };
  await Object.keys(classes).some((i, index) => {
    if (
      classes[i].classOptions.isChecked &&
      !classes[i].classOptions.converted
    ) {
      state.err = {
        ...state.err,
        expNotAllConv: "not all checked roles has converted loadouts"
      };
      exportObj = false;
      console.log("not all checked roles has converted loadouts");

      let prom = new Promise(resolve => setTimeout(resolve, 3000));
      return prom.then(value => {
        actions.clearexperr();
        return value;
      });
    }
    if (classes[i].classOptions.isChecked && classes[i].classOptions.converted)
      exportObj = { ...exportObj, [i]: classes[i] };
  });
  if (exportObj) {
    let exportFile = sqfExport(exportObj, state.Advanced.additionaloptions);
    // exportFile {
    // 	sqf: <sqf data>
    //  filename: <sqf filename>
    // }
    state.Advanced.sqfExport = exportFile.sqf;
  }
};

export const fillAllRolesAtOnce = ({ state, actions }) => {
  const classes = { ...state.Advanced.classes };
  try {
    Object.keys(classes).forEach(i => {
      actions.advConvert(i);
    });
  } catch (error) {
    console.log("uh-oh something wrong in fillAllRolesAtOnce", error);
  }
};

export const showInfo = ({ state }) =>
  (state.Advanced.showInfo = !state.Advanced.showInfo);

export const onCopy = async ({ state }, name) => {
  state.copied = name;
  await new Promise(resolve => setTimeout(resolve, 1500));
  state.copied = false;
};

//gen

export const dbSave = async ({ state, effects }) => {
  try {
    const { user_name, loadout_name, Screen } = state;

    if (user_name.length < 1 || !/\S/.test(user_name))
      throw { custom: { user_name: "user name is missing" } };
    if (loadout_name.length < 1 || !/\S/.test(loadout_name))
      throw { custom: { loadout_name: "loadout name is missing" } };
    const data = {
      user_name,
      loadout_name,
      loadout_type: Screen,
      loadout_state: state[Screen]
    };

    const tst = await effects.db.saveCurrentLoadout(data);
    //console.log('tst', tst);
  } catch (error) {
    if (error["custom"]) {
      state.err = { ...state.err, ...error["custom"] };
    }
    console.log("error in dbSave", error);
  }
};

export const handleDbText = ({ state }, event) => {
  state[event.target.id] = event.target.value;
  if (state.err[event.target.id]) delete state.err[event.target.id];
};

export const sortByDate = async ({ state }) => {
  state.saved_loadouts.sort(
    await function(a, b) {
      var dateA = new Date(a.created);
      var dateB = new Date(b.created);
      return dateB - dateA;
    }
  );
};

export const dbGet = async ({ state, actions, effects }) => {
  try {
    const tst = await effects.db.getLoadouts();
    state.saved_loadouts = tst.data.data;
    actions.sortByDate();
  } catch (error) {
    console.log("error in dbGet", error);
  }
};

export const modal = ({ state, actions }, value) => {
  state.isModalOpen = !state.isModalOpen;
  state.modalType = value;
  if (value === "load") actions.dbGet();
};

export const modalClose = ({ state }) => (state.isModalOpen = false); //just to be sure

export const dbSelected = ({ state }, id) => {
  state.dbSelected = id;
};
export const loadSelected = ({ state, actions }) => {
  let selectedLoad = state.saved_loadouts.find(e => {
    return e._id === state.dbSelected;
  });
  state[selectedLoad.loadout_type] = { ...selectedLoad.loadout_state };

  // state.loaded = true;
  // actions.textAreaChangeBasic();
};

export const cancelSelection = async ({ state }) =>
  (state.dbSelected = await false);

export const resetConverter = async ({ state }) => {
  console.log("initState", state);
  state.upd = true;
  state = await initState;
  //console.log('initState', initState);
  console.log("initState", state);
};
