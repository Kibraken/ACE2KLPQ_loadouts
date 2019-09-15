import React from 'react';

// let data = [
//   ["CUP_arifle_AK101_GL","RH_qdss_nt4","rhs_acc_2dpZenit_ris","",["CUP_30Rnd_556x45_AK",30],["CUP_1Rnd_HE_GP25_M",1],""],
//   ["rhs_weap_igla","","","",["rhs_mag_9k38_rocket",1],[],""],
//   ["CUP_hgun_Glock17_blk","muzzle_snds_L","CUP_acc_Glock17_Flashlight","",["CUP_17Rnd_9x19_glock17",17],[],""],
//   ["CFP_U_Crye_M90",[["FirstAidKit",1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",1,17]]],
//   ["CFP_FAPC_Operator_OGA_OD",[["MiniGrenade",2,1],["SmokeShell",1,1],["SmokeShellGreen",1,1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",2,17]]],
//   ["CFP_Kitbag_White",[["MineDetector",1],["DemoCharge_Remote_Mag",5,1],["SatchelCharge_Remote_Mag",1,1],["APERSTripMine_Wire_Mag",1,1],["APERSMine_Range_Mag",1,1],["CUP_1Rnd_HE_GP25_M",4,1]]],
//   "CFP_OPS2017_Helmet_White","CFP_Face_Wear_Spook",["Binocular","","","",[],[],""],["ItemMap","ItemGPS","ItemRadio","ItemCompass","ItemWatch","CUP_NVG_PVS15_winter"]
// ];

let data = [["CUP_arifle_AK101_GL","RH_qdss_nt4","rhs_acc_2dpZenit_ris","",["CUP_30Rnd_556x45_AK",30],["CUP_1Rnd_HE_GP25_M",1],""],[],["CUP_hgun_Glock17_blk","muzzle_snds_L","CUP_acc_Glock17_Flashlight","",["CUP_17Rnd_9x19_glock17",17],[],""],["CFP_U_Crye_M90",[["FirstAidKit",1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",1,17]]],["CFP_FAPC_Operator_OGA_OD",[["MiniGrenade",2,1],["SmokeShell",1,1],["SmokeShellGreen",1,1],["Chemlight_green",1,1],["CUP_17Rnd_9x19_glock17",2,17]]],["CFP_Kitbag_White",[["MineDetector",1],["DemoCharge_Remote_Mag",5,1],["SatchelCharge_Remote_Mag",1,1],["APERSTripMine_Wire_Mag",1,1],["APERSMine_Range_Mag",1,1],["CUP_1Rnd_HE_GP25_M",4,1]]],"CFP_OPS2017_Helmet_White","CFP_Face_Wear_Spook",["Binocular","","","",[],[],""],["ItemMap","ItemGPS","ItemRadio","ItemCompass","ItemWatch","CUP_NVG_PVS15_winter"]];

//[[],[],[],[],[],[],"","",[],["","","","","",""]]


//rifle     [["CUP_arifle_AK47_Early","","","",["CUP_30Rnd_762x39_AK47_M",30],[],""],[],[],[],[],[],"","",[],["","","","","",""]]
//launcher  [[],["rhs_weap_igla","","","",["rhs_mag_9k38_rocket",1],[],""],[],[],[],[],"","",[],["","","","","",""]]
//pistol    [[],[],["hgun_Pistol_heavy_01_green_F","","","",["11Rnd_45ACP_Mag",11],[],""],[],[],[],"","",[],["","","","","",""]]
//uniform   [[],[],[],["U_C_IDAP_Man_cargo_F",[]],[],[],"","",[],["","","","","",""]]
//vest      [[],[],[],[],["rhs_6b13_Flora",[]],[],"","",[],["","","","","",""]]
//backpack  [[],[],[],[],[],["B_AssaultPack_rgr",[]],"","",[],["","","","","",""]]
//helmet    [[],[],[],[],[],[],"rhs_6b26_green","",[],["","","","","",""]]

//facewear  [[],[],[],[],[],[],"","T_HoodACUBLK",[],["","","","","",""]]

//["CFP_U_Crye_M90","CFP_FAPC_Operator_OGA_OD","CFP_OPS2017_Helmet_White","CFP_Kitbag_White","CFP_Face_Wear_Spook"];
//CFP_OPS2017_Helmet_White
//
//["CUP_arifle_AK101_GL","RH_qdss_nt4","rhs_acc_2dpZenit_ris","",["CUP_30Rnd_556x45_AK",30],["CUP_1Rnd_HE_GP25_M",1],""], <-------
//["CUP_arifle_AK101_GL",[["CUP_30Rnd_556x45_AK",15],["CUP_1Rnd_HE_GP25_M",15]],["RH_qdss_nt4","rhs_acc_2dpZenit_ris"]];

//[["rhs_weap_ak74_gp25","rhs_acc_dtk1983","","",["rhs_30Rnd_545x39_7N6M_AK",30],["CUP_1Rnd_HE_GP25_M",1],""],[],[],[],[],[],"","",[],["","","","","",""]]
//["rhs_weap_ak74_gp25",[["rhs_30Rnd_545x39_7N6M_AK",15],["CUP_1Rnd_HE_GP25_M",15]],["rhs_acc_dtk1983"]];

//["CFP_U_Crye_M90","CFP_FAPC_Operator_OGA_OD","CFP_OPS2017_Helmet_White","CFP_Kitbag_White","CFP_Face_Wear_Spook"];


class App extends React.Component {
  state={
    Lodaut : {},
    ExportArr:data
  }
  /*
  TODO
  validate init data array 
  
  advanced mode for several uniforms at once
  advanced option to convert it into full lodaut file
  advanced option: randomizing gear?
  UI
   parser for default BIS export
  */
  parseGunsFn = (gun,mags)=>{
    let newArr = [];
    gun.forEach((i,index)=>{
      if(index === 0){        
        newArr = [i, [],[]]        ;
      }else if(typeof(i) === "object"){
        if(i.length > 0){
        newArr[1] = [...newArr[1],[i[0],mags]];
        }
      }else if(i.length === 0){       
        //do nothing
      }else{
        newArr[2] = [...newArr[2], i];
      }    
    })
    return newArr
  }
  parseUniformFn=(exportData)=>{
    let uniform = []
    exportData.forEach((i,index)=>{      
      switch(index){
        case 3:
          if(i.length !== 0){
            return uniform = [...uniform, i[0]]
          }else{
            return;
          }
        case 4: 
          if(i.length !== 0){
            return uniform = [...uniform, i[0]]
          }else{
            return;
          }
        case 5:  
          if(i.length !== 0){
            return uniform = [...uniform, i[0]]
          }else{
            return;
          }
        case 6:  
          if(i.length !== 0){            
            return uniform = [...uniform, i]
          }else{
            return;
          }
        case 7:  
          if(i.length !== 0){
            return uniform = [...uniform, i]
          }else{
            return;
          }
        default:
          break;
      }      
    })
    return uniform;    
  }

  convertFn = ()=>{
    //refactor
    let rifle = this.state.ExportArr[0];
    let launcher = this.state.ExportArr[1];
    let handgun = this.state.ExportArr[2];   

    let rifleMags = 15;
    let handgunMags= 4;
    let rockets= 1;
   
    let newRifle = this.parseGunsFn(rifle,rifleMags)
    let newHandgun = this.parseGunsFn(handgun,handgunMags)
    let newLauncher = this.parseGunsFn(launcher,rockets)

    let newUniform = this.parseUniformFn(this.state.ExportArr)
    
    let newLodaut = {newRifle,newHandgun,newLauncher,newUniform}
    this.setState({Lodaut:newLodaut})
  }
  handleText=(event)=>{
    this.setState({ExportArr: event.target.value});
  }
  render(){
  return (
   <div>
     <textarea value={this.state.ExportArr} onChange={this.handleText}></textarea>
     <br/>
     <button onClick={this.convertFn}>test</button>
     <br/>
     <div>Rifle</div>
     {this.state.Lodaut.newRifle !== undefined?(<pre> {JSON.stringify(this.state.Lodaut.newRifle)}</pre>):null}
     <div>Secondary (RPG)</div>
     {this.state.Lodaut.newLauncher !== undefined?(<pre> {JSON.stringify(this.state.Lodaut.newLauncher)}</pre>):null}
     <div>Handgun</div>
     {this.state.Lodaut.newHandgun !== undefined?(<pre> {JSON.stringify(this.state.Lodaut.newHandgun)}</pre>):null}
     <div>Uniform</div>
     {this.state.Lodaut.newUniform !== undefined?(<pre> {JSON.stringify(this.state.Lodaut.newUniform)}</pre>):null}
   </div>
  );
  }
}

export default App;
