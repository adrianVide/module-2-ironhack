const mongoose = require("mongoose")
const Event = require('../models/event');

mongoose.connect('mongodb://localhost/palcony', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Event.collection.drop();


const events = [{
        name: "Zumba lessons",
        description: "Let's have a dancing session to stay in shape!",
        organizer: "5e74efeb253e7d4d34ae76dc",
        date: "2020-03-31T22:50:00.000Z",
        latitude: '41.39654586166389',
        longitude: '2.184197902679444',
        isItOver: false,
    },
    {
        name: "House party",
        description: "Let's bring down the house bruuuuh!",
        organizer: "5e74efeb253e7d4d34ae76dd",
        date: "2020-03-30T12:50:00.000Z",
        latitude: '41.392666491129376',
        longitude: '2.177503108978272',
        isItOver: false,
    },
    {
        name: "Guitar concert",
        description: "Let me play you the song of my people.",
        organizer: "5e74efeb253e7d4d34ae76de",
        date: "2020-03-31T10:30:00.000Z",
        latitude: '41.38796586476439',
        longitude: '2.182374000549317',
        isItOver: false,
    },
    {
        name: "Karaoke",
        description: "Just a small town girl, living in a lonely world... She took the midnight train going AAANYYYYWHERE",
        organizer: "5e74efeb253e7d4d34ae76e0",
        date: "2020-03-30T19:15:00.000Z",
        latitude: '41.38727362052774',
        longitude: '2.176430225372315',
        isItOver: false,
    },
    {
        name: "Self-flagellation",
        description: "If we atone for our sins through self-inflicted pain, maybe this plague will relent",
        organizer: "5e74efeb253e7d4d34ae76e1",
        date: "2020-03-31T15:30:00.000Z",
        latitude: '41.39284356287685',
        longitude: '2.1800565719604497',
        isItOver: false,
    },
    {
        name: "Bungee-jumping",
        description: "Watch me try to bungee-jump from my balcony using my besheets as a tether. I'd suggest you to wear a raincoat.",
        organizer: "5e74efeb253e7d4d34ae76e2",
        date: "2020-03-30T18:55:00.000Z",
        latitude: '41.39187771112176',
        longitude: '2.1850347518920903',
        isItOver: false,
    },
    {
        name: "Seppuku",
        description: "I shall preserve my family's honour in front of everyone, no matter the cost. Tell my son he always was a disappointment.",
        organizer: "5e74efeb253e7d4d34ae76e3",
        date: "2020-03-31T12:00:00.000Z",
        latitude: '41.39187771312176',
        longitude: '2.1850347513920903',
        isItOver: false,
    }
]

Event.create(events, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${events.length} events`)
    mongoose.connection.close();
});