import axios from 'axios';

export const db = {
	saveCurrentLoadout(data) {
		return axios({
			method: 'post',
			crossdomain: true,
			// headers: {
			// 	'Access-Control-Allow-Origin': '*'
			// },
			url: 'https://armatools.dura.science/addLoadout',
			data
		});
	},
	getLoadouts() {
		return axios({
			method: 'get',
			crossdomain: true,
			url: 'https://armatools.dura.science/getLoadouts'
		});
	}
};
