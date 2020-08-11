import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { emptyGame, emptyRace } from './utils/Interface'
import { fetchFromApi, formatDate } from './utils/FetchAndFormat'

function App() {
	const [ gameType, setGameType ] = useState(String)
	const [ selectedRace, setSelectedRace ] = useState({ race: '', time: '' })
	const [ raceInfo, setRaceInfo ] = useState<emptyRace | undefined>(undefined)
	const [ gameData, setGameData ] = useState<emptyGame | undefined>(undefined)
	const [ notAllowed, setNotAllowed ] = useState(false)

	const allowedTypes = [ 'V75', 'V65', 'V64', 'V4' ]

	useEffect(
		() => {
			selectedRace.race !== '' && fetchFromApi('games', selectedRace.race, setRaceInfo)
		},
		[ selectedRace ]
	)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (allowedTypes.includes(gameType)) {
			fetchFromApi('products', gameType, setGameData)
			setNotAllowed(false)
		} else {
			setGameData(undefined)
			setRaceInfo(undefined)
			setNotAllowed(true)
		}
	}

	const Header = (
		<React.Fragment>
			<h1 className="text-3xl mb-6 italic uppercase text-yellow-500">ATG frontend interview task</h1>
			<p className="mb-4">Enter a game type below (V75, V65, V64 or V4)</p>
			<form onSubmit={(e) => handleSubmit(e)} name="inputForm">
				<input
					value={gameType}
					onChange={(e) => setGameType(e.target.value.toUpperCase())}
					className="text-center text-black p-2"
					type="text"
				/>
				<input type="submit" value="Submit" className="text-gray-900 p-2" />
			</form>
		</React.Fragment>
	)

	const notAllowedInfo = (
		<p className="bg-red-600 rounded-md mt-6 text-white p-6">
			Please enter one of the following game types: V75, V65, V64 or V4.
		</p>
	)

	return (
		<div className="w-full px-4 md:px-0 text-white md:w-1/2 mx-auto mt-6 md:mt-20 flex items-center flex-col">
			{Header}

			<div className="w-full">
				{notAllowed && { notAllowedInfo }}
				{gameData !== undefined && (
					<div className="mt-10 w-full flex flex-wrap md:flex-col">
						<p className="mb-4">Click a race to see detailed information</p>

						{gameData.upcoming.map((race) => (
							<div
								key={race.id}
								onClick={() => setSelectedRace({ race: race.id, time: race.startTime })}
								className={`cursor-pointer border-b-4 w-1/2 md:w-40 my-1 p-2 ${race.id ===
								selectedRace.race
									? 'border-blue-100'
									: 'border-blue-900 '}`}
							>
								&gt; {formatDate(race.startTime)}
							</div>
						))}
					</div>
				)}
				{raceInfo !== undefined && (
					<div className="text-black">

						<div className="text-center text-white">
							<div className="mt-12 mb-6 text-2xl">{formatDate(selectedRace.time)}</div>
							<div>
								This race has {raceInfo.races.length} starts and is {raceInfo.status}.
							</div>
						</div>

						{raceInfo.races.map((race, index) => (
							<div className="flex flex-wrap my-10 w-full bg-blue-100 p-4">
								<div className="w-full text-sm mb-4">Start {index + 1}</div>
								<div className="w-1/4">
									{moment(race.scheduledStartTime).format('H[:]mm')} {`(`}
									{moment(race.date).format('ddd D')}
									{`)`}
								</div>
								<div className="w-3/4 text-lg">{race.name}</div>
								<div className="w-full" />

								{race.starts.map((start) => (
									<div className="w-full flex flex-wrap md:w-1/3 py-4 px-2">
										<div className="w-1/6">
											<div className="rounded-full shadow-sm text-center w-6 h-6 bg-white">
												{start.number}
											</div>
										</div>
										<div className="w-5/6 flex flex-col">
											<div className="pl-2">
												&#x1F472; {start.driver.firstName} {start.driver.lastName}
											</div>
											<details className="pl-2">
												<summary>
													&#x1F40E;{' '}
													<span className="border-b border-blue-800 border-dotted">
														{start.horse.name}
													</span>
												</summary>
												<p className="my-1 text-sm pl-2">
													Trainer: {start.horse.trainer.firstName}{' '}
													{start.horse.trainer.lastName}
												</p>
												<p className="my-1 text-sm pl-2">
													Father: {start.horse.pedigree.father.name}
												</p>
											</details>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}


export default App
