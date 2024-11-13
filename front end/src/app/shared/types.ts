export type Plan = {
    name: string,
    dayCount: number,
    workouts: Workout[]
}

export type Workout = {
    name: string,
    exerciseCount: number,
    exercises: Exercise[]
}

export type Exercise = {
    name: string,
    records?: Record[]
}

export type Record = {
    date: string,
    weight: number,
    unit: string,
    sets: number,
    reps: number,
    eVal?: number
}

export type ExerciseDTO = {
    id: string,
    name: string
}

export type PlanDTO = {
    id: string,
    name: string,
    workouts: WorkoutDTO[]
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
