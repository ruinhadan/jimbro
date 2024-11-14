INSERT INTO EXERCISE VALUES (0, 'Bench Press'), (1, 'Machine Shoulder Press'), (2, 'Leg Press'), (3, 'Lat Pulldown');
INSERT INTO PLAN VALUES (0, 'PPL'), (1, 'UL');
INSERT INTO WORKOUT VALUES (0, 'Push 1'), (1, 'Pull 1'), (2, 'Upper 1'), (3, 'Lower 1');
INSERT INTO WORKOUT_EXERCISES VALUES (0, 0), (0, 2), (1, 0), (1, 2), (2, 3), (3, 1), (3, 2);
INSERT INTO PLAN_WORKOUTS VALUES (0, 0), (0, 1), (1, 2), (1, 3);
INSERT INTO RECORD VALUES (12, 2, 0, 15, '2024-01-10', 0, 0), (8, 1, 0, 20, '2024-01-10', 0, 1);
INSERT INTO WORKOUT_RECORDS VALUES (0, 0), (1, 0);