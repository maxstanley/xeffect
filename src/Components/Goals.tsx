import { useState } from "react";

import { GoalCard } from ".";

import { Goal } from "../Types";

const EXAMPLE_GOALS: Array<Goal> = [
	{
		ID: 1,
		Title: "Goal 1",
		Motivation: "Motivation 1",
		CurrentStreak: 20,
		BestStreak: 20,
		Completed: true,
	},
	{
		ID: 2,
		Title: "Goal 2",
		Motivation: "Motivation 2",
		CurrentStreak: 4,
		BestStreak: 10,
		Completed: false,
	},
	{
		ID: 3,
		Title: "Goal 3",
		Motivation: "Motivation 3",
		CurrentStreak: 2,
		BestStreak: 3,
		Completed: true,
	},
];

export default function Goals(): JSX.Element {
	const [ goals, setGoals ] = useState<Array<Goal>>(EXAMPLE_GOALS);

	const toggleGoalCompletion = (index: number): void => {
		let goal = goals[index];
		goal.Completed = !goal.Completed;
		goal.CurrentStreak += (goal.Completed ? 1 : -1);

		setGoals([
			...goals.slice(0, index),
			goal,
			...goals.slice(index + 1),
		]);
	};

	return (
		<>
			{goals.map((goal: Goal, index: number) => (
					<GoalCard
						goal={goal}
						index={index}
						toggleCompletion={toggleGoalCompletion}
					/>
			))}
		</>
	);
}
