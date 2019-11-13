export class ParseLoadout {
  constructor(data, ammo, role) {
    this.data = data;
    this.RifleMags = ammo.RifleMags;
    this.SidearmMags = ammo.SidearmMags;
    this.RLrockets = ammo.RLrockets;
    this.role = role;
  }
  //output type, string or an array/object

  validate(data) {
    //[[], [], [], [], [], [], '', '', [], ['', '', '', '', '', '']];
    //console.log(data);
    if (data.length !== 10 || data[9].length !== 6) {
      return console.log("not valid length"), true;
    }
    data.forEach((i, index) => {
      if ((index === 6 || index === 7) && typeof i !== "string") {
        return console.log("not valid, missing strings"), true;
      } else if (index !== 6 && index !== 7 && typeof i !== "object") {
        return console.log("not valid type of element", index), true;
      }
    });
    data[9].forEach((i, index) => {
      if (typeof i !== "string") {
        return console.log("not valid type in arr"), true;
      }
    });
    return false;
  }

  parseGunsFn = (gun, mags) => {
    let newArr = [];
    gun.forEach((i, index) => {
      if (index === 0) {
        newArr = [i, [], []];
      } else if (typeof i === "object") {
        if (i.length > 0) {
          newArr[1] = [...newArr[1], [i[0], mags]];
        }
      } else if (i.length === 0) {
        //do nothing
      } else {
        newArr[2] = [...newArr[2], i];
      }
    });
    return newArr;
  };

  parseUniformFn = exportData => {
    //TODO, find and check that in some cases empty strings should be left behind
    let uniform = [];
    exportData.forEach((i, index) => {
      //[[],[],[],[],[],[],"","",[],["","","","","",""]]
      /* [
		  ["CUP_arifle_AK101_GL","RH_qdss_nt4","rhs_acc_2dpZenit_ris","",["CUP_30Rnd_556x45_AK",30],["CUP_1Rnd_HE_GP25_M",1],""],
		  [],
		  ["CUP_hgun_Glock17_blk","muzzle_snds_L","CUP_acc_Glock17_Flashlight","",["CUP_17Rnd_9x19_glock17",17],[],""],
		  ["CFP_U_Crye_M90",[["FirstAidKit",1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",1,17]]],
		  ["CFP_FAPC_Operator_OGA_OD",[["MiniGrenade",2,1],["SmokeShell",1,1],["SmokeShellGreen",1,1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",2,17]]],
		  ["CFP_Kitbag_White",[["MineDetector",1],["DemoCharge_Remote_Mag",5,1],["SatchelCharge_Remote_Mag",1,1],["APERSTripMine_Wire_Mag",1,1],["APERSMine_Range_Mag",1,1],["CUP_1Rnd_HE_GP25_M",4,1]]],
		  "CFP_OPS2017_Helmet_White",
		  "CFP_Face_Wear_Spook",
		  ["Binocular","","","",[],[],""],["ItemMap","ItemGPS","ItemRadio","ItemCompass","ItemWatch","CUP_NVG_PVS15_winter"]]
	*/
      //["CFP_U_Crye_M90","CFP_FAPC_Operator_OGA_OD","CFP_Kitbag_White","CFP_OPS2017_Helmet_White","CFP_Face_Wear_Spook"];
      //["","","","",""]
      //["uniform","vest","backpack","helmet","facewear"]
      switch (index) {
        case 3:
          //console.log("3", i);
          //uniform

          if (Array.isArray(i) && i.length === 0)
            return (uniform = [...uniform, ""]);
          if (i[0].length === 0) return (uniform = [...uniform, ""]);
          return (
            i[0].length !== 0 &&
            typeof i[0] === "string" &&
            (uniform = [...uniform, i[0]])
          );
        case 4:
          // console.log("4", i);
          //vest
          if (Array.isArray(i) && i.length === 0)
            return (uniform = [...uniform, ""]);
          return (
            i[0].length !== 0 &&
            typeof i[0] === "string" &&
            (uniform = [...uniform, i[0]])
          );
        case 5:
          // console.log("5", i);
          //backpack
          //error
          if (Array.isArray(i) && i.length === 0)
            return (uniform = [...uniform, ""]);
          return (
            i[0].length !== 0 &&
            typeof i[0] === "string" &&
            (uniform = [...uniform, i[0]])
          );
        case 6:
          //helmet
          // console.log("6", i);
          if (typeof i === "string" && i.length === 0)
            return (uniform = [...uniform, ""]);
          return (
            i.length !== 0 &&
            typeof i === "string" &&
            (uniform = [...uniform, i])
          );
        case 7:
          //face wear
          // let uniform1 = [...uniform];
          // console.log('1', uniform1);
          // console.log('2', uniform1.push('Lene'));
          //uniform = [...uniform, i];
          //uniform.splice(uniform.length, 0, 'test');
          if (typeof i === "string" && i.length === 0)
            return (uniform = [...uniform, ""]);
          return (
            i.length !== 0 &&
            typeof i === "string" &&
            (uniform = [...uniform, i])
          );
        default:
          break;
      }
    });
    //console.log("uniform", uniform);
    return uniform;
  };
  convertFn = async () => {
    //validation is turned off// app crashing errors in some cases
    // if (await this.validateExp(this.state.ExportArr)) {
    // 	return alert('not valid');
    // }
    let rifle = this.data[0];
    let launcher = this.data[1];
    let handgun = this.data[2];

    let newRifle = this.parseGunsFn(this.data[0], this.RifleMags);

    let newHandgun = this.parseGunsFn(handgun, this.SidearmMags);
    let newLauncher = this.parseGunsFn(launcher, this.RLrockets);

    let newUniform = this.parseUniformFn(this.data);

    let newLoadout = { newRifle, newHandgun, newLauncher, newUniform };
    return newLoadout;
  };
  //for corovaneer
  // exportFn = async () => {
  // 	sqfExport(this.state.Loadout);
  // };
}

/*
this.parseUniformFn=function(e){var n=[];return e.forEach(function(e,t){switch(t){case 3:case 4:case 5:return 0!==e[0].length&&"string"===typeof e[0]&
*/
