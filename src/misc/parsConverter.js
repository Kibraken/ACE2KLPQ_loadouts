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
			return console.log('not valid length'), true;
		}
		data.forEach((i, index) => {
			if ((index === 6 || index === 7) && typeof i !== 'string') {
				return console.log('not valid, missing strings'), true;
			} else if (index !== 6 && index !== 7 && typeof i !== 'object') {
				return console.log('not valid type of element', index), true;
			}
		});
		data[9].forEach((i, index) => {
			if (typeof i !== 'string') {
				return console.log('not valid type in arr'), true;
			}
		});
		return false;
	}

	parseGunsFn = (gun, mags) => {
		let newArr = [];
		gun.forEach((i, index) => {
			if (index === 0) {
				newArr = [i, [], []];
			} else if (typeof i === 'object') {
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
			switch (index) {
				case 3:
					//console.log('3', i);
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 4:
					//	console.log('4', i);
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 5:
					//	console.log('5', i);
					//backpack
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 6:
					//helmet
					//	console.log('6', i);
					return (
						i.length !== 0 && typeof i === 'string' && (uniform = [...uniform, i])
					);
				case 7:
					//face wear
					// let uniform1 = [...uniform];
					// console.log('1', uniform1);
					// console.log('2', uniform1.push('Lene'));
					uniform = [...uniform, i];
					//uniform.splice(uniform.length, 0, 'test');

					return i.length !== 0 && typeof i === 'string' && uniform;
				default:
					break;
			}
		});
		//console.log('uniform', uniform);
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
