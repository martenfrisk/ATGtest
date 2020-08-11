
export interface emptyGame {
		betType: string
		upcoming: [{ id: string; startTime: string }]
		results: []
	}

export interface emptyRace {
		id: string
		status: string
		races: [
			{
				date: string
				name: string
				scheduledStartTime: string
				starts: [
					{
						number: number
						driver: {
							firstName: string
							lastName: string
						}
						horse: {
							name: string
							trainer: {
								firstName: string
								lastName: string
							}
							pedigree: {
								father: {
									name: string
								}
							}
						}
					}
				]
			}
		]
	}