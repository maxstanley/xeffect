import { Goal, NewGoal } from "../Types";

const API_URL = "https://api.maxstanley.uk/v1/xeffect"

export async function getAllGoals(): Promise<Array<Goal>> {
    let response;

    try {
        response = await fetch(`${API_URL}/goals`);
    } catch (error) {
       console.log(error);
    }

    return await response?.json();
}

export async function createGoal(newGoal: NewGoal): Promise<boolean> {
    let response;

    try {
        response = await fetch(`${API_URL}/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGoal),
        });
    } catch (error) {
       console.log(error);
    }

    return (response?.status === 201);
}

export async function setGoalCompletion(goal: Goal, date: string, isCompleted: boolean): Promise<boolean> {
    let response;

    try {
        response = await fetch(`${API_URL}/goals/${goal.uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "mark_completed",
                date,
                is_completed: isCompleted,
            }),
        });
    } catch (error) {
       console.log(error);
    }

    return (response?.status === 201);
}

export function isGoalCompletedOnDate(goal: Goal, completionDate: string): boolean {
    for (const streakDate of goal.streak_dates) {
        if (streakDate > completionDate) {
            continue;
        }

        if (!goal.streaks || !goal.streaks[streakDate]) {
            console.log(`Checking Completion ${goal.uuid} false (no streaks)`)
            return false;
        }

        let streakEndDate = new Date(streakDate);
        streakEndDate.setDate(streakEndDate.getDate() + goal.streaks[streakDate].streak_length);

        if (completionDate < streakEndDate.toISOString().split("T")[0]) {
            console.log(`Checking Completion ${goal.uuid} true`)
            return true;
        }

        console.log(`Checking Completion ${goal.uuid} false not in streak`)
        return false;
    }

    console.log(`Checking Completion ${goal.uuid} false no matching streaks`)
    return false;
}