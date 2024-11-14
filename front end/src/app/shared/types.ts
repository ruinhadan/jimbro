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
    exercise: Exercise,
    date: string,
    weight: number,
    unit: Unit,
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
    name: string,
    exercises: ExerciseDTO[],
    records: RecordDTO[]
}

export enum Unit {
    KG,
    LBS
}

export type RecordDTO = {
    id: string,
    reps: number,
    sets: number,
    weight: number,
    date: Date,
    exercise: ExerciseDTO,
    unit: Unit
}

export enum RightPanel {
    HOWTO,
    EXERCISEFORM,
    PLANFORM,
    WORKOUTFORM,
    RECORDS,
    RECORDFORM
}
