import React from "react";
import { workoutProgram as training_plan } from "../utils/index";
import WorkoutCard from "./WorkoutCard";

function Grid() {
    const isLocked = false;
    const selectedWorkout = 0;

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

            if (index === selectedWorkout) {
                return <WorkoutCard key={index} />;
            }

            return (
                <button
                    className={"card plan-card " + (isLocked ? "inactive" : "")}
                    key={index}
                >
                    <div className="plan-card-header">
                        <p>
                            Day{" "}
                            {(index / 8 <= 1)
                                ? "0" + (index + 1)
                                : index + 1}
                        </p>
                    </div>

                    {isLocked ? (
                        <i className="fa-solid fa-lock"></i>
                    ) : index % 3 === 0 ? (
                        <i className="fa-solid fa-dumbbell"></i>
                    ) : index % 3 === 1 ? (
                        <i className="fa-solid fa-weight-hanging"></i>
                    ) : (
                        <i className="fa-solid fa-bolt"></i>
                    )}

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
        <div className="training-grid-plan">
            {mapping()}
        </div>
    );
}

export default Grid;