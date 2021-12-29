import { ChangeEvent, useEffect, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Container,
	Grid,
	makeStyles,
	TextField,
	Typography
} from "@material-ui/core";

import { NewGoal } from "../Types";

interface Props {
	submitGoal: (newGoal: NewGoal) => Promise<void>;
}

const useStyles = makeStyles({
	card: {
		width: "80%",
		marginBottom: "20px"
	},
});

export function CreateGoalCard(props: Props): JSX.Element {
	const { submitGoal } = props;
	const classes = useStyles();

	const [ title, setTitle ] = useState<string>("");
	const [ motivation, setMotivation ] = useState<string>("");

	const createGoal = (event: any) => {
		(async () => {
			event.preventDefault();
			console.log(`Title: ${title}\nMotivation: ${motivation}`);
			const newGoal: NewGoal = {
				title,
				motivation,
			}
			await submitGoal(newGoal);
			clearGoal();
		})()
	}

	const clearGoal = () => {
		setTitle("");
		setMotivation("");
	}

	return (
		<Card className={classes.card}>
			<CardContent>
				<Container>
						<TextField
							label="Title"
							required
							value={title}
							onInput={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
							fullWidth
						/>
						<TextField
							label="Motivation"
							value={motivation}
							onInput={(event: ChangeEvent<HTMLInputElement>) => setMotivation(event.target.value)}
							fullWidth
						/>
						<Button
							fullWidth
							color="primary"
							onClick={createGoal}
						>
							Create Goal
						</Button>
				</Container>
			</CardContent>
		</Card>
	);
}
