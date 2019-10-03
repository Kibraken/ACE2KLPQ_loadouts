export function sqfExport(classes, options) {
    let exportObject = {};

    let loadoutVars = '';
    let loadoutArray = `private _loadoutArray = [\r\n`;
    
    Object.entries(classes).forEach((entry) => {
        
        let defaultOptions = [];

        let classVar = entry[0];
        let className = entry[1].className;
        let classTags = entry[1].classTags || [];
        let classOptions = entry[1].classOptions || defaultOptions;
        let classLoadout = entry[1].classLoadout || [];
        
        console.log(className);

        // Fashion(or your clothes)
        // private _${className}Fashion = ["uniform_class_name", "vest", "hat", "backpack", "glasses"];
        let [uniform, vest, headgear, backpack, glasses] = classLoadout.newUniform;
        loadoutVars += `private _${classVar}Fashion = ["${uniform}", "${vest}", "${headgear}", "${backpack}", "${glasses}"]; \r\n`;

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
        loadoutVars += `private _${classVar}Items = []`;

        // Class loadout put together
        let loadoutName = `${className}`;

        if(classTags.length > 0) {
            classTags.forEach(tag => {
                loadoutName += tag + ", ";
            });
        }
        loadoutName = loadoutName.slice(0,-1);
        loadoutArray += `\r\n[\r\n    ["${loadoutName}"],\r\n    [_${classVar}Primary, _${classVar}Secondary, _${classVar}Launcher]\r\n],`;
        
    });

    console.log(loadoutVars, loadoutArray);

    return exportObject;
}