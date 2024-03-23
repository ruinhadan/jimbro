export type Plan = {
    name: string,
    dayCount: number,
    workouts?: Workout[]
}

export type Workout = {
    name: string,
    exerciseCount: number,
    exercises?: Exercise[]
}

export type Exercise = {
    name: string,
    records?: Record[]
}

export type Record = {
    date: string,
    weight: number,
    unit: 'kg',
    sets: number,
    reps: number,
    eVal?: number
}
