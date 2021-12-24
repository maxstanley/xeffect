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
	index: number;

	toggleCompletion: (index: number) => void;
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
	const { index, goal, toggleCompletion } = props;
	const classes = useStyles();

	return (
		<Card className={`${goal.Completed ? classes.crossedOut : ""} ${classes.card}`}>
			<CardActionArea onClick={() => toggleCompletion(index)}>
				<CardContent>
					<Grid
						container
						spacing={3}
						direction="row"
					>
						<Grid item>
							<Typography variant="h5">
								{goal.Title}
							</Typography>
							<Typography>
								{goal.Motivation}
							</Typography>
						</Grid>
						<Grid item>
							<p>{String.fromCodePoint(FIRE_EMOJI)} {goal.CurrentStreak}</p>
							<p>Best: {goal.BestStreak}</p>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
