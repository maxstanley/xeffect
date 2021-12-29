export interface NewGoal {
	title: string;
	motivation: string;
};

export interface Goal {
	uuid: string;
	title: string;
	motivation: string;
	best_streak: number;
	streaks: {[key: string]: GoalStreak};
	streak_dates: Array<string>;
};

export interface GoalStreak {
	streak_length: number;
};
