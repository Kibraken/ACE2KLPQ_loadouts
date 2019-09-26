//place all mission related stuff here
//do not overwrite this file when copying framework from mission to mission

private ["_basicMedicine", "_advancedMedicine", "_medicine", "_basicMedicMedicine", "_advancedMedicMedicine", "_medicMedicine"];
private ["_riflemanFashion", "_specFashion", "_leaderFashion", "_crewFashion", "_pilotFashion", "_medicMedicine"];
private ["_riflemanPrimary", "_specPrimary", "_glRifleWeapon", "_leaderPrimary", "_mgWeapon", "_handgunWeapon", "_leaderSecond", "_atLauncherWeapon", "_atMissileWeapon", "_aaMissileWeapon", "_binoculars"];
private ["_items", "_linkItems", "_boxItems", "_boxMedicine"];

_basicMedicine = [["ACE_fieldDressing", 20], ["ACE_morphine", 10], ["ACE_epinephrine", 2], ["ACE_bloodIV_250", 1]];
_advancedMedicine = [["ACE_fieldDressing", 10], ["ACE_quikclot", 10], ["ACE_morphine", 10], ["ACE_epinephrine", 2], ["ACE_tourniquet", 1], ["ACE_personalAidKit", 1], ["ACE_bloodIV_250", 1]];

_medicine = _basicMedicine;

_basicMedicMedicine = [["ACE_fieldDressing", 40], ["ACE_morphine", 20], ["ACE_epinephrine", 4], ["ACE_bloodIV_250", 2]];
_advancedMedicMedicine = [["ACE_fieldDressing", 20], ["ACE_quikclot", 20], ["ACE_morphine", 20], ["ACE_epinephrine", 4], ["ACE_tourniquet", 2], ["ACE_personalAidKit", 2], ["ACE_bloodIV_250", 2]];

_medicMedicine = _basicMedicMedicine;

private _uniform = "MNP_CombatUniform_Fin_A";
private _vest = "MNP_CombatUniform_Fin_A";
_hats = ["CFP_Headband_wdl", "MNP_Boonie_FIN", "H_Watchcap_khk", "MNP_MC_OD", "SP_Beret2_Black", "MNP_Helmet_FIN_T"];
_riflemanFashion = ["MNP_CombatUniform_Fin_A","MNP_Vest_FIN_1", selectRandom _hats,"B_AssaultPack_wdl_F",""];
_specFashion = ["MNP_CombatUniform_Fin_A","H_Watchcap_camo","CUP_H_PMC_Beanie_Headphones_Khaki","B_AssaultPack_wdl_F",""];
_leaderFashion = ["MNP_CombatUniform_Fin_A","MNP_Vest_FIN_1","H_Watchcap_camo","B_AssaultPack_wdl_F",""];
_pilotFashion = [_uniform, _vest, "H_PilotHelmetHeli_B", "B_Kitbag_cbr", ""];
_crewFashion = [_uniform, _vest, "H_HelmetCrew_B", "B_Kitbag_cbr", ""];

_riflemanPrimary = ["hlc_rifle_RK62",[["hlc_30Rnd_762x39_b_ak",10]],["CUP_muzzle_mfsup_Flashhider_762x39_OD"]];
_specPrimary = ["hlc_rifle_RK62",[["hlc_30Rnd_762x39_b_ak",10]],["CUP_muzzle_mfsup_Flashhider_762x39_OD"]];
_glRifleWeapon = ["CUP_arifle_G36A_AG36_RIS_wdl", [["CUP_30Rnd_556x45_G36_wdl", 7], ["1Rnd_HE_Grenade_shell", 10]], []];
_leaderPrimary = _glRifleWeapon;

private _mgMag = "hlc_100Rnd_762x51_M_M60E4";
_mgWeapon = ["hlc_lmg_MG3", [[_mgMag, 3]], []];
private _mgMags = ["", [[_mgMag, 2]], []];

_handgunWeapon = ["CUP_hgun_Glock17", [["CUP_17Rnd_9x19_glock17", 2]], []];
_leaderSecond = _handgunWeapon;

private _atLauncher = "launch_NLAW_F";

_atLauncherWeapon = ["launch_NLAW_F",[["ACE_PreloadedMissileDummy",1]],[]];
_atMissileWeapon = ["CUP_launch_M72A6",[["ACE_PreloadedMissileDummy",1]],[]];
_aaMissileWeapon = ["CUP_launch_M72A6",[["ACE_PreloadedMissileDummy",1]],[]];

_binoculars = ["ACE_VectorDay", [], []];

private _additionGrenade = "SmokeShellBlue";
private _fragGrenade = "HandGrenade";

_items = [["ACE_EarPlugs", 1], ["ACE_Flashlight_XL50", 1], [_additionGrenade, 3], ["ACE_CableTie", 2]];
_linkItems = ["ItemMap", "ItemCompass", "ItemWatch", "ItemGPS"];

_boxItems = [
    ["ToolKit", 10],
    ["ACE_wirecutter", 2],
    ["ACE_SpareBarrel", 10],
    ["ACE_CableTie", 80],
    ["ACE_Clacker", 10],
    ["murshun_cigs_cigpack", 40],
    ["murshun_cigs_matches", 40],
    [_atLauncher, 20],
    [_additionGrenade, 200],
    [_fragGrenade, 80],
    ["DemoCharge_Remote_Mag", 20],
    ["SatchelCharge_Remote_Mag", 4]
]; //content for boxes

_boxMedicine = _medicine apply {[_x select 0, (_x select 1) * 60]};

private _identity = [
    "", //face
    "" //voice
]; //identity, ai only

private _loadoutArray = [
    [
        [
            ["officer", "squad leader"],
            [
                _leaderFashion,
                [_leaderPrimary, _leaderSecond, _binoculars]
            ]
        ],
        [
            ["combat life saver"],
            [
                _specFashion,
                [_specPrimary]
            ]
        ],
        [
            ["engineer"],
            [
                _specFashion,
                [_specPrimary]
            ]
        ],
        [
            ["team leader"],
            [
                _riflemanFashion,
                [_leaderPrimary, _leaderSecond, _binoculars]
            ]
        ],
        [
            ["missile specialist (at)"],
            [
                _specFashion,
                [_specPrimary, _atMissileWeapon]
            ]
        ],
        [
            ["missile specialist (aa)"],
            [
                _specFashion,
                [_specPrimary, _atMissileWeapon]
            ]
        ],
        [
            ["autorifleman"],
            [
                _riflemanFashion,
                [_mgWeapon]
            ]
        ],
        [
            ["rifleman (at)"],
            [
                _riflemanFashion,
                [_riflemanPrimary, _mgMags, _atLauncherWeapon]
            ]
        ],
        [
            ["pilot", "helicopter pilot"],
            [
                _pilotFashion,
                [_specPrimary]
            ]
        ],
        [
            ["crewman", "helicopter crew"],
            [
                _crewFashion,
                [_specPrimary]
            ]
        ],
        [
            ["grenadier"],
            [
                _riflemanFashion,
                [_glRifleWeapon]
            ]
        ],
        [
            ["rifleman"],
            [
                _riflemanFashion,
                [_riflemanPrimary]
            ]
        ]
    ], //equipment per class
    [
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
        [
            ["missile specialist (at)"],
            [],
            []
        ],
        [
            ["missile specialist (aa)"],
            [],
            []
        ],
        [
            ["autorifleman"],
            [],
            []
        ],
        [
            ["rifleman (at)"],
            [],
            []
        ],
        [
            ["pilot", "helicopter pilot", "crewman", "helicopter crew"],
            [["ToolKit", 1]],
            ["ItemGPS"]
        ],
        [
            ["grenadier"],
            [],
            []
        ],
        [
            ["rifleman"],
            [],
            []
        ]
    ], //personal items per class
    _boxItems + _boxMedicine,
    _identity
];

//output of the function, do not remove or change
_loadoutArray
