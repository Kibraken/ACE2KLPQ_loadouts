// TODO: make this somewhat sane, please
// TODO: make proper generation, burn in hell forver for trying to do it otherwise
import { template } from './sqfTemplate';

function sqifyUniform (fashion) {
    let flatFashion = `[`;
    for(let i = 0; i < fashion.length; i++) {
        if( fashion[i] !== '') {
            flatFashion += `"${fashion[i]}",`;
        }
    }
    flatFashion.slice(0,-1);
    flatFashion += `]`;
    
    return flatFashion;
}

function sqifyWeapon (weapon) {
    let flatWeapon = `[`;
    
    if( weapon[0] !== '' && weapon[0] !== false && weapon[0] !== undefined) {
        flatWeapon += `"${weapon[0]}",`;
    }
    else {
        return '[]';
    }

    flatWeapon += '['

    if( weapon[1] !== [] && weapon[1] != null) {
        if( weapon[1][0] !== [] && weapon[1][0] != null) {
            flatWeapon += `["${weapon[1][0][0]}", "${weapon[1][0][1]}"],`;
        } else {
            flatWeapon += '[],';
        }

        if( weapon[1][1] !== [] && weapon[1][1] != null) {
            flatWeapon += `["${weapon[1][1][0]}", "${weapon[1][1][1]}"],`;
        } else {
            flatWeapon += '[],';
        }
        flatWeapon.slice(0, -1);
        flatWeapon += '],';
    } else {
        flatWeapon += '[],';
    }

    if(weapon[2] !== [] && weapon[2] != null) {
        flatWeapon += '[';
        weapon[2].forEach(attachment => {
            flatWeapon += `${attachment},`
        });
        flatWeapon.slice(0, -1);
        flatWeapon += ']';
    } else {
        flatWeapon += '[]';
    }
    flatWeapon.slice(0,-1);
    
    flatWeapon += ']';

    return flatWeapon;
}

export function sqfExport (loadout) {
    

    // Placeholder structures, to be expanded
    // [It's an absolute monstrousity and I want it to burn]

    // classes = {
    //  'classname': [<nametags>]
    // }
    let classes = {
        'leader': ['squad leader', 'officer', 'team leader'],
        'medic': ['combat life saver', 'corpsman', 'medic'],
        'engineer': ['combat engineer', 'sapper', 'engineer'],
        'atSpecialist': ['missle specialist (at)'],
        'aaSpecialist': ['missle specialist (aa)'],
        'autorifleman': ['autorifleman', 'lmg', 'machinegunner'],
        'grenadier': ['grenadier', 'gl throwing machine'],
        'rifleman': ['rifleman', 'cannon fodder'],
        'custom': ['artillery officer', 'artillery crew']
    };

    // loadoutArray = [
    //  [   uniform, weapons, binoculars per class
    //      [
    //          ['name tags', 'class names'],
    //          [ _loadoutVars, [_classWeapons, _specialItems]
    //      ]
    //  ],
    //  [   equipment per class
    //      [
    //          ['name tags', 'class names'],
    //          [_classEquipment, _classRadios, _linkItems]
    //      ]
    //  ],
    //  [   personal items per class
    //      [
    //          ['name tags', 'class names'],
    //          [_items]
    //      ]
    //  ],
    //  [   identity
    //      "face", "voice"
    //  ]
    //];


    let loadoutArray = `private _loadoutArray = [
        [ // uniform, weapons per class`;
    let exportData = `
    private _basicMedicine = ${template.medicine};
    private _advancedMedicine = ${template.medicine};
    private _medicMedicine = ${template.medicine};
    private _binoculars = ["Ace_VectorDay", [], []];
    private _additionGrenade = "${template.smokeGrenade}";
    private _fragGrenade = "${template.fragGrenade}";
    private _items = [["ACE_EarPlugs", 1], ["ACE_Flashlight_XL50", 1], [_additionGrenade, 3], ["ACE_CableTie", 2]];
    private _linkItems = ["ItemMap", "ItemCompass", "ItemWatch", "ItemGPS"];
    
    `;

    Object.entries(classes).forEach((element) => {
        let index = element[0];
        exportData += `
        private _${index}Fashion = ${sqifyUniform(loadout.newUniform)};
        private _${index}Primary = ${sqifyWeapon(loadout.newRifle)};
        private _${index}Secondary = ${sqifyWeapon([loadout.newHandgun[0], [], loadout.newHandgun[1]])};
        private _${index}Launcher = ${sqifyWeapon(loadout.newLauncher)};
        `; // quick crutch, I know, I hate myself too
        
        // I hope I will stay alive long enough to fix this eventually
        let tagline = '';
        element[1].forEach(classname => {
            tagline += '"'+classname+'", ';
        });
        tagline.slice(0, -1);
        loadoutArray += `
        [
            [${tagline}],
            [
                _${index}Fashion,
                [_${index}Primary, _${index}Secondary, _${index}Launcher, _binoculars]
            ]
        ],
        `;
    });

    loadoutArray.slice(0, -1);
    loadoutArray += '],';
    loadoutArray += `
    [ // equipment per class
        [
            ["all"],
            [["ACRE_PRC343", 1]],
            []
        ],
        [
            ["officer", "squad leader", "team leader", "pilot", "crewman"],
            [["ACRE_PRC152", 1]],
            []
        ],
        [
            ["all"],
            _items + _medicine, //items
            _linkItems //link items
        ],
        [
            ["officer", "squad leader", "team leader"],
            [["murshun_cigs_lighter", 1]],
            []
        ],
        [
            ["combat life saver"],
            _medicMedicine,
            []
        ],
        [
            ["engineer"],
            [["ACE_M26_Clacker", 1], ["ACE_DefusalKit", 1], ["DemoCharge_Remote_Mag", 2]],
            []
        ],
    `;

    loadoutArray.slice(0, -1);
    loadoutArray += '],';
    loadoutArray += `//personal items per class ], _boxItems + _boxMedicine, _identity
];

//output of the function, do not remove or change
_loadoutArray
`;
    exportData += loadoutArray;

    console.log(exportData);
}