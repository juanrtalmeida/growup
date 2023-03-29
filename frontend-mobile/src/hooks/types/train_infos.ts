export type Train = {
	days: number
	exercises: Array<Exercise>
	start: string
	end: string | null
	id: string
	name: string
	trainWeeks: Array<TrainWeek>
}

export type TrainWeek = {
	id: string
	weekChange: {
		changeType: string
		changeValue: number
	}
	weekNumber: number
	start: string
	end: string | null
}

export type Exercise = {
	id: string
	name: string
	description: string
	exerciseDetails: {
		reps: number
		series: number
		weight: number
	}
}
