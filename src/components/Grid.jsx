import React, { useState } from "react";
import { workoutProgram as training_plan } from "../utils/index";
import WorkoutCard from "./WorkoutCard";

function Grid() {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [ savedWorkouts, setSavedWorkouts ] = useState(null);
    const completedWorkouts = [];
    const isLocked = false;

    function handleSave(index, data) {
        // SAVE TO THE LOCAL STORAGE AND MODIFY THE SAVED WORKOUTS
    }

    function handleComplete(index, data) {
        //  Complete a workout (Basically we modify the completed status)

    }

    function mapping() {
        const workouts = Object.keys(training_plan);

        return workouts.map((workout, index) => {
            const type =
                index % 3 === 0
                    ? "Push"
                    : index % 3 === 1
                    ? "Pull"
                    : "Legs";

            const trainingPlan = training_plan[index];
            const dayNum = (index / 8 <= 1)? "0" + (index + 1) : index + 1;
            const icon = index % 3 === 0 ? (
                        <i className="fa-solid fa-dumbbell"></i>
                    ) : index % 3 === 1 ? (
                        <i className="fa-solid fa-weight-hanging"></i>
                    ) : (
                        <i className="fa-solid fa-bolt"></i>
                    ) 

            if (index === selectedWorkout) {
                return <WorkoutCard key={index} 
                            trainingPlan={trainingPlan}
                            type={type}
                            workoutIndex={index}
                            dayNum={dayNum} 
                            icon={icon}
                        />;
            }

            return (
                <button onClick={() => {
                    setSelectedWorkout(workoutIndex)
                }}
                    className={"card plan-card " + (isLocked ? "inactive" : "")}
                    key={index}
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
        </div>
    );
}

export default Grid;