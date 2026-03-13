import React, { useState, useEffect } from "react";
import { workoutProgram as training_plan } from "../utils/index";
import WorkoutCard from "./WorkoutCard";

function Grid() {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [ savedWorkouts, setSavedWorkouts ] = useState(null);
    const completedWorkouts = Object.keys(savedWorkouts || []).filter((val) => {
        const entry = savedWorkouts[val];
        return entry.isComplete;
    });

    function handleSave(index, data) {
        // SAVE TO THE LOCAL STORAGE AND MODIFY THE SAVED WORKOUTS
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }

        setSavedWorkouts(newObj);
        localStorage.setItem('brogram', JSON.stringify(newObj));
        setSelectedWorkout(null);
    }

    function handleComplete(index, data) {
        //  Complete a workout (Basically we modify the completed status)
        const newObj = {...data};
        newObj.isComplete = true;
        handleSave(index, newObj);
    }

    function handleResetProgress() {
        const shouldReset = window.confirm("Are you sure you want to reset everything?");
        if (!shouldReset) return;

        localStorage.removeItem("brogram");
        setSavedWorkouts({});
        setSelectedWorkout(null);
    }

    // Reading the stored data back in.
    useEffect(() => {
        if (!localStorage) { return }

        let savedData = {};
        if (localStorage.getItem('brogram')) {
            savedData = JSON.parse(localStorage.getItem('brogram'));
        }

        setSavedWorkouts(savedData);
    }, []);

    function mapping() {
        const workouts = Object.keys(training_plan);

        return workouts.map((workout, workoutIndex) => {
            const isLocked = (workoutIndex === 0)? false : 
            !completedWorkouts.includes(`${workoutIndex - 1}`)

            console.log(workoutIndex, isLocked);

            const type =
                workoutIndex % 3 === 0
                    ? "Push"
                    : workoutIndex % 3 === 1
                    ? "Pull"
                    : "Legs";

            const trainingPlan = training_plan[workoutIndex];
            const dayNum = (workoutIndex / 8 <= 1)? "0" + (workoutIndex + 1) : workoutIndex + 1;
            const icon = workoutIndex % 3 === 0 ? (
                        <i className="fa-solid fa-dumbbell"></i>
                    ) : workoutIndex % 3 === 1 ? (
                        <i className="fa-solid fa-weight-hanging"></i>
                    ) : (
                        <i className="fa-solid fa-bolt"></i>
                    ) 

            if (workoutIndex === selectedWorkout) {
                return <WorkoutCard key={workoutIndex} 
                            savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                            trainingPlan={trainingPlan}
                            type={type}
                            workoutIndex={workoutIndex}
                            dayNum={dayNum} 
                            icon={icon}
                            handleSave={handleSave}
                            handleComplete={handleComplete}
                        />;
            }

            return (
                <button onClick={() => {
                    if (isLocked) { return }
                    setSelectedWorkout(workoutIndex)
                }}
                    className={"card plan-card " + (isLocked ? "inactive" : "")}
                    key={workoutIndex}
                >
                    <div className="plan-card-header">
                        <p>Day {dayNum}</p>
                    </div>

                    {isLocked ? (
                        <i className="fa-solid fa-lock"></i>
                    ) : (icon)}

                    <div className="plan-card-header">
                        <h4>
                            <b>{type}</b>
                        </h4>
                    </div>
                </button>
            );
        });
    }

    return (
        <div className="training-plan-grid">
            {mapping()}
            <button className="reset-btn" onClick={handleResetProgress}>Reset all progress</button>
        </div>
    );
}

export default Grid;