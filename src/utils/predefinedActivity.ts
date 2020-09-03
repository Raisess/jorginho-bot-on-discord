import { Client } from 'discord.js';

import { setActivity } from './setActivity';
import predefinedActivitiesArr from './predefinedActivities.json';

interface ITime {
	day:     Array<number>;
	hour:    Array<number>;
}

interface IPreActvity {
	status:       string;
	time:         ITime;
	activityName: string;
	activityType: string;
}

const predefinedActivities: Array<IPreActvity> = predefinedActivitiesArr;

export const predefinedActivity = (client: Client): boolean => {
	// real time date data
	const day:  number = new Date().getDay();
	const hour: number = new Date().getHours();
	const mins: number = new Date().getMinutes();

	// select the correct index for this time :thumbsup:
	for (let activity of predefinedActivities) {
		if (hour >= activity.time.hour[0] && (hour <= activity.time.hour[1] && mins >= 0)) {
			//console.log(activity);

			for (let i = 0; i < activity.time.day.length; i++) {
				if (day == activity.time.day[i]) {
					return setActivity(client,
				 										 activity.status,
														 activity.activityName,
														 activity.activityType);
				}
			}
		}
	}

	return false;
}

