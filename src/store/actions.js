import { Overmind, pipe, action, map, debounce } from 'overmind';

export const switchScreen = ({ state }) => {
	state.BasicScreen = !state.BasicScreen;
};

// export const getNameFromEvent = map(({ value: event }) =>
// 	console.log('dura', event.target.value)
// );

// export const magsChange = async ({ state, actions, effects }, e) => {
// 	// let b = e;
// 	// console.log(b);

// 	actions.getNameFromEvent;

// 	// state.Basic.ammo[event.currentTarget.id] =
// 	// 	event.target.value !== '' ? parseInt(event.target.value) : 1;
// };

// Basic: {
// 	Loadout: {},
// 	ExportArr: initData,
// 	ammo: { RifleMags: 10, SidearmMags: 4, RLrockets: 2 }
// }

// const getNameFromEvent = map(({ value: event }) => event.target.value);

// const setSearchValue = action(({ state, value }) => {
//   state.inputValue = value;
// });

// actions: {
//     getUsers,
//     prevPage: ({ state }) => {
//       state.currentPage--;
//     },
//     nextPage: ({ state }) => {
//       state.currentPage++;
//     },
//     handleSearchChange: pipe(
//       getNameFromEvent,
//       setSearchValue,
//       debounce(300),
//       getUsers
//     )
//   }

//   value={overmind.state.inputValue}
//     onChange={overmind.actions.handleSearchChange}
