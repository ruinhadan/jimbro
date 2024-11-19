export type Plan = {
    id: string,
    name: string,
    dayCount: number,
    workouts: Workout[]
}

export type Workout = {
    id: string,
    name: string,
    exercises: Exercise[],
    records: Record[]
}

export type Exercise = {
    id: string,
    name: string
}

export type Record = {
    id: string,
    date: string,
    weight: number,
    unit: string,
    sets: number,
    reps: number
}

export type ExerciseDTO = {
    id: string,
    name: string
}

export type PlanDTO = {
    id: string,
    name: string
}

export type WorkoutDTO = {
    id: string,
    name: string
}

export const Unit = new Map()
Unit.set(0, "kg")
Unit.set(1, "lbs")

export type RecordDTO = {
    id: string,
    reps: number,
    sets: number,
    weight: number,
    date: Date,
    unit: number
}

export enum RightPanel {
    HOWTO,
    EXERCISEFORM,
    PLANFORM,
    WORKOUTFORM,
    RECORDS,
    RECORDFORM
}
