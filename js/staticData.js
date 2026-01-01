export const staticData = {
    events: {
        global: [
            {
                name: "Fireworks Festival",
                id: "fireworks_festival_one",
                day: 6,
                hour: 7,
                minute: 30,
                duration: 30,
                type: 'global',
                timeframe: "Saturday (UTC) 12:30",
                estTime: "07:30",
                seaTime: "20:30",
                asiaTime: "21:30",
                europeTime: "13:30"
            },
            {
                name: "Fireworks Festival",
                id: "fireworks_festival_two",
                day: 6,
                hour: 19,
                minute: 30,
                duration: 30,
                type: 'global',
                timeframe: "Sunday (UTC) 00:30",  // Note: late Saturday night in Americas/Europe
                estTime: "19:30",
                seaTime: "08:30",
                asiaTime: "09:30",
                europeTime: "01:30"
            },
            {
                name: "Mirage Boat",
                id: "mirage_boat_one",
                day: 0,
                hour: 6,
                minute: 0,
                duration: 60,
                type: 'global',
                timeframe: "Sunday (UTC) 11:00",
                estTime: "06:00",
                seaTime: "19:00",
                asiaTime: "20:00",
                europeTime: "12:00"
            },
            {
                name: "Mirage Boat",
                id: "mirage_boat_two",
                day: 0,
                hour: 18,
                minute: 0,
                duration: 60,
                type: 'global',
                timeframe: "Sunday (UTC) 23:00",
                estTime: "18:00",
                seaTime: "07:00",
                asiaTime: "08:00",
                europeTime: "00:00"
            }
        ],
        guild: {
            testGuild: [{1: 1}, {"2": "2"}],
            dessert: [
                {
                    name: "Breaking Army",
                    id: "breaking_army_one",
                    day: 3,
                    hour: 7,
                    minute: 30,
                    duration: 60,
                    type: 'guild',
                    timeframe: "Wednesday (UTC) 12:30",
                    estTime: "07:30",
                    seaTime: "20:30",
                    asiaTime: "21:30",
                    europeTime: "13:30"
                },
                {
                    name: "Breaking Army",
                    id: "breaking_army_two",
                    day: 6,
                    hour: 1,
                    minute: 0,
                    duration: 60,
                    type: 'guild',
                    timeframe: "Saturday (UTC) 06:00",
                    estTime: "01:00",
                    seaTime: "14:00",
                    asiaTime: "15:00",
                    europeTime: "07:00"
                },
                {
                    name: "Showdown",
                    id: "showdown_one",
                    day: 4,
                    hour: 1,
                    minute: 0,
                    duration: 60,
                    type: 'guild',
                    timeframe: "Thursday (UTC) 06:00",
                    estTime: "01:00",
                    seaTime: "14:00",
                    asiaTime: "15:00",
                    europeTime: "07:00"
                },
                {
                    name: "Showdown",
                    id: "showdown_two",
                    day: 0,
                    hour: 7,
                    minute: 30,
                    duration: 60,
                    type: 'guild',
                    timeframe: "Sunday (UTC) 12:30",
                    estTime: "07:30",
                    seaTime: "20:30",
                    asiaTime: "21:30",
                    europeTime: "13:30"
                },
                {
                    name: "Guild Party",
                    id: "guild_party_daily",
                    day: null,
                    hour: 8,
                    minute: 30,
                    duration: 30,
                    type: 'guild',
                    timeframe: "Daily (UTC) 13:30",
                    estTime: "08:30",
                    seaTime: "21:30",
                    asiaTime: "22:30",
                    europeTime: "14:30"
                }
            ],
        }
    }
};