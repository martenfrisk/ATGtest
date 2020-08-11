import moment from 'moment'

export function fetchFromApi(type: string, input: string, state: any) {
	fetch(`https://www.atg.se/services/racinginfo/v1/api/${type}/${input}`)
		.then((response) => response.json())
		.then((result) => state(result))
		.catch((error) => console.log('error', error))
}

export const formatDate = (date: string) => moment(date).format('ddd Do H[:]mm')