export const template = {
    _medicine: [["ACE_fieldDressing", 20], ["ACE_morphine", 10], ["ACE_epinephrine", 2], ["ACE_bloodIV_250", 1]],
    _uniform: [],
    _vest: [],
    _hat: [],

    _riflemanFashion : [],
    _specFashion: [],
    _leaderFashion: [],
    _pilotFashion: [],
    _crewFashion: [],

    _riflemanPrimary = [],
    _specPrimary: [],
    _leaderPrimary: [],
    _pilotPrimary: [],
    _crewPrimary: [],

    _riflemanSecondary = [],
    _specSecondary: [],
    _leaderSecondary: [],
    _pilotSecondary: [],
    _crewSecondary: [],

    _leaderRadio: ["ACRE_PRC152", 1],
    _commonRadio: ["ACRE_PRC343", 1],

    _hatLauncher: [],
    _latLauncher: [],
    _aaLauncher: [],

    _binoculars: [],
    _leaderBinoculars: [],
    _specBinoculars: [],

    _smokeGrenade: 'SmokeShellBlue',
    _fragGrenade: 'HandGrenade',

    _items:  [["ACE_EarPlugs", 1], ["ACE_Flashlight_XL50", 1], [_additionGrenade, 3], ["ACE_CableTie", 2]],
    _leaderLinkItems: ["ItemMap", "ItemCompass", "ItemWatch", "ItemGPS"],

    _boxItems: [],

    _identity: [],

    _loadoutArray: [
        [
            ['officer', 'squad leader'],
            [
                _leaderFashion,
                [_leaderPrimary, _leaderSecondary, _leaderBinoculars],
                _leaderRadio,
                _items,
                _medecine,
                _leaderLinkItems
            ]
        ],
        [
            ['rifleman'],
            [
                _riflemanFashion,
                [_riflemanPrimary, _riflemanSecondary],
                _commonRadio,
                _items,
                _medecine,
                _commonLinkItems
            ]
        ]
    ]




};