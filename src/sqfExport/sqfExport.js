export function sqfExport(classes, options) {
    let exportObject = {};

    let loadoutVars = '';
    let loadoutArray = `private _loadoutArray = [\r\n[\r\n // Uniforms per class`;
    let equipmentArray = `// Equipment per class\r\n[\r\n`;
    
    Object.entries(classes).forEach((entry) => {
        
        let defaultOptions = [];

        let classVar = entry[0];
        let className = entry[1].className;
        let classTags = entry[1].classTags || [];
        let classOptions = entry[1].classOptions || defaultOptions;
        let classLoadout = entry[1].classLoadout || [];
        
        console.log(classOptions);

        // Fashion(or your clothes)
        // private _${className}Fashion = ["uniform_class_name", "vest", "hat", "backpack", "glasses"];
        let [uniform, vest, headgear, backpack, glasses] = classLoadout.newUniform;
        loadoutVars += `private _${classVar}Fashion = ["${uniform}", "${vest}", "${headgear}", "${backpack}", "${glasses}"];\r\n`;

        // Primary weapon
        // private _${className}Primary = ["weapon_class_name", [[primary mags], [secondary mags]], [addons]];
        loadoutVars += `private _${classVar}Primary = ${JSON.stringify(classLoadout.newRifle)};\r\n`;

        // Secondary weapon
        // private _${className}Secondary = ["weapon_class_name", [[mags]], [addons]];
        loadoutVars += `private _${classVar}Secondary = ${JSON.stringify(classLoadout.newHandgun)};\r\n`;

        // Launcher weapon
        // private _${className}Secondary = ["weapon_class_name", [[mags]], [addons]];
        loadoutVars += `private _${classVar}Launcher = ${JSON.stringify(classLoadout.newLauncher)};\r\n`;

        // Special items and misc.
        // private _${classVar}Items = [["item name", amount]];
        let classItems = ``;
        let classLinkItems = ``;
        //let classBinoculars;
        if(classOptions.binocular) { classItems += `["${classOptions.binocular}", 1], `; }
        if(classOptions.compass) { classLinkItems += `"ItemCompass", `; }
        if(classOptions.gps) { classLinkItems += `"ItemGPS", `; }
        if(classOptions.map) { classLinkItems += `"ItemMap", `; }
        //if(classOptions.mgMags) { classItems += `["${mgMags}"]`; }
        if(classOptions.nvg) { classLinkItems += `"${classOptions.nvg}", `; }
        if(classOptions.radioFt) { classItems += `["${classOptions.radioFt}", 1], `; }
        if(classOptions.radioSq) { classItems += `["${classOptions.radioSq}", 1], `;}

        classItems = classItems.trimRight().slice(0, -1);
        classLinkItems = classLinkItems.trimRight().slice(0, -1);
        loadoutVars += `private _${classVar}Items = [${classItems}];\r\n`;
        loadoutVars += `private _${classVar}LinkItems = [${classLinkItems}];\r\n\r\n`;

        // Class loadout put together
        let loadoutName = `"${className}", `;
        if(classTags.length > 0) {
            classTags.forEach(tag => {
                loadoutName += '"' + tag + '", ';
            });
        }
        loadoutName = loadoutName.trimRight().slice(0, -1);
        loadoutArray += `\r\n  [\r\n    [${loadoutName}],\r\n    [_${classVar}Primary, _${classVar}Secondary, _${classVar}Launcher]\r\n  ],`;

        // Class equipment 
        equipmentArray += `\r\n  [\r\n    [${loadoutName}],\r\n    [_${classVar}Items],\r\n    [_${classVar}LinkItems]\r\n  ],`;
        
    });

    loadoutArray = loadoutArray.trimRight().slice(0,-1);
    equipmentArray = equipmentArray.trimRight().slice(0, -1);
    loadoutArray = loadoutArray + "\r\n], " + equipmentArray + "\r\n],\r\n// Personal items per class\r\n _boxItems + _boxMedicine, \r\n_identity \r\n];";

    exportObject.sqf = loadoutVars + "\r\n" + loadoutArray;
    console.log(exportObject.sqf);
    return exportObject;
}