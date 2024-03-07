# jimbro
Personal gym assistant Jimb(r)o

# To-do/Feature List
- Login/Logout/Create Account
- Create Workout Plan

```
Plan = {
    "name": string,
    "dayCount": number,
    "workouts": Workout[]
}

Workout = {
    "name": string,
    "exerciseCount": number,
    "exercises": Exercise[]
}

Exercise = {
    "name": string,
    "records": Record[]
}

date - "DD:MM:YYYY"

Record = {
    date: {
        "weight": number,
        "sets": number,
        "reps": number,
        "eVal": number
    }[]
}
```
- Add workout details after each workout
- View statistics and graphs\*
- Update Workout\*
- Delete Workout

\* - Iteration 2