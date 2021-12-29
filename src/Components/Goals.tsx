import { useEffect, useState } from "react";
import {
	Button,
} from "@material-ui/core";
import {
	Add as AddIcon
} from '@mui/icons-material';

import { GoalCard, CreateGoalCard } from ".";
import { getAllGoals, createGoal, setGoalCompletion, isGoalCompletedOnDate } from "../Services/Goals";

import { Goal, NewGoal } from "../Types";

export default function Goals(): JSX.Element {
	const [ goals, setGoals ] = useState<Array<Goal>>([]);
	const [ displayCreateCard, setDisplayCreateCard ] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			fetchAllGoals();
		})()
	}, []);

	const fetchAllGoals = async () => {
		let data = await getAllGoals();
		setGoals(data);
	};

	const toggleCreateCard = () => {
		setDisplayCreateCard(!displayCreateCard);
	};

	const submitGoal = async (newGoal: NewGoal) => {
		toggleCreateCard();
		await createGoal(newGoal);
		await fetchAllGoals();
	};

	const todaysDate = new Date().toISOString().split("T")[0];
	const toggleGoalCompletion = async (goal: Goal, isCompleted: boolean): Promise<void> => {
		await setGoalCompletion(goal, todaysDate, isCompleted);

		await fetchAllGoals();
	};

	return (
		<>
			<Button variant="contained" startIcon={<AddIcon />} onClick={toggleCreateCard}>Create</Button>
			{displayCreateCard ? <CreateGoalCard submitGoal={submitGoal} /> : <></>}
			{goals.map((goal: Goal) => (
					<GoalCard
						key={goal.uuid}
						goal={goal}
						completed={isGoalCompletedOnDate(goal, todaysDate)}
						toggleCompletion={toggleGoalCompletion}
					/>
			))}
		</>
	);
}
