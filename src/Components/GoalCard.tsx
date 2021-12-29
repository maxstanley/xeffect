import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	makeStyles,
	Typography
} from "@material-ui/core";

import { Goal } from "../Types";

interface Props {
	goal: Goal;
	completed: boolean;

	toggleCompletion: (goal: Goal, completed: boolean) => Promise<void>;
}

const FIRE_EMOJI = 0x1F525;

const CROSSED_OUT_CARD = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M100 0 L0 100 ' stroke='black' stroke-width='1'/><path d='M0 0 L100 100 ' stroke='black' stroke-width='1'/></svg>")`;

const useStyles = makeStyles({
	card: {
		width: "80%",
		marginBottom: "20px"
	},
	crossedOut: {
		background: CROSSED_OUT_CARD,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "100% 100%, auto",
	}
});

export default function GoalCard(props: Props): JSX.Element {
	const { goal, toggleCompletion, completed } = props;
	const classes = useStyles();

	let currentStreak = 0;
	if (goal.streak_dates != null && goal.streak_dates.length > 0) {
		currentStreak = goal.streaks[goal.streak_dates[0]]?.streak_length;
	}

	return (
		<Card className={`${completed ? classes.crossedOut : ""} ${classes.card}`}>
			<CardActionArea onClick={() => toggleCompletion(goal, !completed)}>
				<CardContent>
					<Grid
						container
						spacing={3}
						direction="row"
					>
						<Grid item>
							<Typography variant="h5">
								{goal.title}
							</Typography>
							<Typography>
								{goal.motivation}
							</Typography>
						</Grid>
						<Grid item>
							<p>{String.fromCodePoint(FIRE_EMOJI)} {currentStreak}</p>
							<p>Best: {goal.best_streak}</p>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
