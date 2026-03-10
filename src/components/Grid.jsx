import React from "react";
import { workoutProgram as training_plan } from "../utils/index";

function Grid() {
    const isLocked = false;
    function mapping() {
        const workouts = Object.keys(training_plan);
        return (
            workouts.map((workout, index) => {
                return (
                    <button key={index}>
                        <div className="plan-card-header">
                            <p>Day {((index / 8) <= 1)? '0' + (index + 1) : (index + 1)}</p>
                        </div>
                        {isLocked? (
                            <i className="fa-solid fa-lock"></i>
                        ) : (
                            index % 3 === 0? (
                                <i className="fa-solid fa-dumbbell"></i>
                            ) : (
                                index % 3 === 1? (
                                    <i className="fa-solid fa-weight-hanging"></i>
                                ) : (
                                    <i className="fa-solid fa-bolt"></i>
                                )
                            )
                        )}
                    </button>
                )
            })
        );
    }

    return (
        <div className="training-grid-plan">
            {mapping()}

        </div>
    )
}

export default Grid;
