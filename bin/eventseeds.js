const mongoose = require("mongoose")
const Event = require('../models/event');

mongoose.connect('mongodb://localhost/palcony', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Event.collection.drop();

const events = [{"participants":[],"isItOver":true,"reviews":[],"name":"Shooting passers-by","description":"You were warned to stay at home","date":{"$date":{"$numberLong":"1584984660000"}},"organizer":{"$oid":"5e78e35a8801e739e13f9a72"},"latitude":"41.396499299999995","longitude":"2.1562661","createdAt":{"$date":{"$numberLong":"1584984602369"}},"updatedAt":{"$date":{"$numberLong":"1584985618729"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e78dd1e4a58a520f8c07702"}],"isItOver":false,"reviews":[],"name":"Guitar concert","description":"Let me play you the song of my people.","organizer":"5e74efeb253e7d4d34ae76de","date":{"$date":{"$numberLong":"1585650600000"}},"latitude":"41.38796586476439","longitude":"2.182374000549317","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585051283339"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4aff89d9b833edaa8236"},{"$oid":"5e7a4bec89d9b833edaa823a"},{"$oid":"5e7a4d4689d9b833edaa823e"}],"isItOver":false,"reviews":[],"name":"Karaoke","description":"No crass songs, though. Think of the children. Also I call dibs on Don't Stop Believing.","organizer":"5e74efeb253e7d4d34ae76e0","date":{"$date":{"$numberLong":"1585595700000"}},"latitude":"41.38727362052774","longitude":"2.176430225372315","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585073534480"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e78dd1e4a58a520f8c07702"},{"$oid":"5e7a4aff89d9b833edaa8236"},{"$oid":"5e7a4b6f89d9b833edaa8238"},{"$oid":"5e7a4c6b89d9b833edaa823c"}],"isItOver":false,"reviews":[],"name":"Self-flagellation","description":"If we atone for our sins through self-inflicted pain, maybe this plague will relent","organizer":"5e74efeb253e7d4d34ae76e2","date":{"$date":{"$numberLong":"1585668600000"}},"latitude":"41.39284356287685","longitude":"2.1800565719604497","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585073338320"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4a7589d9b833edaa8234"},{"$oid":"5e7a4d4689d9b833edaa823e"}],"isItOver":false,"reviews":[],"name":"Zumba lessons","description":"Let's have a dancing session to stay in shape!","organizer":"5e74efeb253e7d4d34ae76dc","date":{"$date":{"$numberLong":"1585695000000"}},"latitude":"41.39654586166389","longitude":"2.184197902679444","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585073538829"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4a7589d9b833edaa8234"},{"$oid":"5e7a4aff89d9b833edaa8236"},{"$oid":"5e7a4b6f89d9b833edaa8238"},{"$oid":"5e7a4bec89d9b833edaa823a"},{"$oid":"5e7a4c6b89d9b833edaa823c"},{"$oid":"5e7a4d4689d9b833edaa823e"}],"isItOver":false,"reviews":[],"name":"House party","description":"My landlord is quarantined in a different town, so let's burn down the place.","organizer":"5e74efeb253e7d4d34ae76dd","date":{"$date":{"$numberLong":"1585572600000"}},"latitude":"41.392666491129376","longitude":"2.177503108978272","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585073530553"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4a7589d9b833edaa8234"},{"$oid":"5e7a4aff89d9b833edaa8236"},{"$oid":"5e7a4b6f89d9b833edaa8238"},{"$oid":"5e7a4c6b89d9b833edaa823c"}],"isItOver":false,"reviews":[],"name":"Bungee-jumping","description":"Watch me try to bungee-jump from my balcony using my besheets as a tether. I'd suggest you to wear a raincoat.","organizer":{"$oid":"5e74efeb253e7d4d34ae76e2"},"date":{"$date":{"$numberLong":"1585594500000"}},"latitude":"41.39187771112176","longitude":"2.1850347518920903","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585073292617"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e78dd1e4a58a520f8c07702"},{"$oid":"5e7a4a7589d9b833edaa8234"},{"$oid":"5e7a4aff89d9b833edaa8236"}],"isItOver":false,"reviews":[],"name":"Seppuku","description":"I shall preserve my family's honour in front of everyone, no matter the cost. Tell my son he always was a disappointment.","organizer":"5e74efeb253e7d4d34ae76e3","date":{"$date":{"$numberLong":"1585656000000"}},"latitude":"41.39284356287685","longitude":"2.1850347518920903","createdAt":{"$date":{"$numberLong":"1584722092852"}},"updatedAt":{"$date":{"$numberLong":"1585072920705"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4b6f89d9b833edaa8238"}],"isItOver":false,"reviews":[],"name":"Golden rain","description":"I'm sorry, but my toilet broke and the plumber said he's not risking the virus.","date":{"$date":{"$numberLong":"1628010000000"}},"organizer":{"$oid":"5e78dd1e4a58a520f8c07702"},"latitude":"41.395010137502766","longitude":"2.1644762903451924","createdAt":{"$date":{"$numberLong":"1585065801730"}},"updatedAt":{"$date":{"$numberLong":"1585073077965"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4aff89d9b833edaa8236"}],"isItOver":false,"reviews":[],"name":"101 Dalmatians","description":"Imma get myself a new fur coat","date":{"$date":{"$numberLong":"1588374300000"}},"organizer":{"$oid":"5e7a3729f433b217c170d93f"},"latitude":"41.3964718","longitude":"2.1562566999999997","createdAt":{"$date":{"$numberLong":"1585070830219"}},"updatedAt":{"$date":{"$numberLong":"1585072930012"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4aff89d9b833edaa8236"},{"$oid":"5e7a4c6b89d9b833edaa823c"}],"isItOver":false,"reviews":[],"name":"¡Junta urgente!","description":"¡Qué follón!","date":{"$date":{"$numberLong":"1586829900000"}},"organizer":{"$oid":"5e7a4a7589d9b833edaa8234"},"latitude":"41.39770826410684","longitude":"2.1632580997899624","createdAt":{"$date":{"$numberLong":"1585072795459"}},"updatedAt":{"$date":{"$numberLong":"1585073273812"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4b6f89d9b833edaa8238"}],"isItOver":false,"reviews":[],"name":"Cooking lessons","description":"Be careful not to drop anything down the balcony","date":{"$date":{"$numberLong":"1587562200000"}},"organizer":{"$oid":"5e7a4aff89d9b833edaa8236"},"latitude":"41.393885303004026","longitude":"2.1584079023871365","createdAt":{"$date":{"$numberLong":"1585072965946"}},"updatedAt":{"$date":{"$numberLong":"1585073085371"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4bec89d9b833edaa823a"},{"$oid":"5e7a4c6b89d9b833edaa823c"},{"$oid":"5e7a4d4689d9b833edaa823e"}],"isItOver":false,"reviews":[],"name":"Prepare for the apocalypse","description":"The machines will rise up, so let me teach you how to survive and kick some Terminator ass.","date":{"$date":{"$numberLong":"1586097000000"}},"organizer":{"$oid":"5e7a4b6f89d9b833edaa8238"},"latitude":"41.397913937647864","longitude":"2.156229607455145","createdAt":{"$date":{"$numberLong":"1585073054206"}},"updatedAt":{"$date":{"$numberLong":"1585073554059"}},"__v":{"$numberInt":"0"}},
{"participants":[{"$oid":"5e7a4c6b89d9b833edaa823c"},{"$oid":"5e7a4d4689d9b833edaa823e"}],"isItOver":false,"reviews":[],"name":"Cat skinning lessons","description":"There's many ways to skin a cat. Today, we'll take a look at all of them.","date":{"$date":{"$numberLong":"1588685400000"}},"organizer":{"$oid":"5e7a4bec89d9b833edaa823a"},"latitude":"41.39414732847052","longitude":"2.155896961173065","createdAt":{"$date":{"$numberLong":"1585073218135"}},"updatedAt":{"$date":{"$numberLong":"1585073548247"}},"__v":{"$numberInt":"0"}},
{"participants":[],"isItOver":false,"reviews":[],"name":"Lorem ipsum is outdated","description":"Deal with it.","date":{"$date":{"$numberLong":"1587659400000"}},"organizer":{"$oid":"5e7a4c6b89d9b833edaa823c"},"latitude":"41.39186675599484","longitude":"2.168669227035163","createdAt":{"$date":{"$numberLong":"1585073330633"}},"updatedAt":{"$date":{"$numberLong":"1585073330633"}},"__v":{"$numberInt":"0"}},
{"participants":[],"isItOver":false,"reviews":[],"name":"Screech like an animal","description":"My roommate is a massive annoyance and I want him to be miserable. Please help me achieve that. ","date":{"$date":{"$numberLong":"1588092300000"}},"organizer":{"$oid":"5e7a4d4689d9b833edaa823e"},"latitude":"41.39497710569678","longitude":"2.1689269015307038","createdAt":{"$date":{"$numberLong":"1585073524115"}},"updatedAt":{"$date":{"$numberLong":"1585073524115"}},"__v":{"$numberInt":"0"}},
]





// const events = [{
//         name: "Zumba lessons",
//         description: "Let's have a dancing session to stay in shape!",
//         organizer: "5e74efeb253e7d4d34ae76dc",
//         date: "2020-03-31T22:50:00.000Z",
//         latitude: '41.39654586166389',
//         longitude: '2.184197902679444',
//         isItOver: false,
//     },
//     {
//         name: "House party",
//         description: "Let's bring down the house bruuuuh!",
//         organizer: "5e74efeb253e7d4d34ae76dd",
//         date: "2020-03-30T12:50:00.000Z",
//         latitude: '41.392666491129376',
//         longitude: '2.177503108978272',
//         isItOver: false,
//     },
//     {
//         name: "Guitar concert",
//         description: "Let me play you the song of my people.",
//         organizer: "5e74efeb253e7d4d34ae76de",
//         date: "2020-03-31T10:30:00.000Z",
//         latitude: '41.38796586476439',
//         longitude: '2.182374000549317',
//         isItOver: false,
//     },
//     {
//         name: "Karaoke",
//         description: "Just a small town girl, living in a lonely world... She took the midnight train going AAANYYYYWHERE",
//         organizer: "5e74efeb253e7d4d34ae76e0",
//         date: "2020-03-30T19:15:00.000Z",
//         latitude: '41.38727362052774',
//         longitude: '2.176430225372315',
//         isItOver: false,
//     },
//     {
//         name: "Self-flagellation",
//         description: "If we atone for our sins through self-inflicted pain, maybe this plague will relent",
//         organizer: "5e74efeb253e7d4d34ae76e1",
//         date: "2020-03-31T15:30:00.000Z",
//         latitude: '41.39284356287685',
//         longitude: '2.1800565719604497',
//         isItOver: false,
//     },
//     {
//         name: "Bungee-jumping",
//         description: "Watch me try to bungee-jump from my balcony using my besheets as a tether. I'd suggest you to wear a raincoat.",
//         organizer: "5e74efeb253e7d4d34ae76e2",
//         date: "2020-03-30T18:55:00.000Z",
//         latitude: '41.39187771112176',
//         longitude: '2.1850347518920903',
//         isItOver: false,
//     },
//     {
//         name: "Seppuku",
//         description: "I shall preserve my family's honour in front of everyone, no matter the cost. Tell my son he always was a disappointment.",
//         organizer: "5e74efeb253e7d4d34ae76e3",
//         date: "2020-03-31T12:00:00.000Z",
//         latitude: '41.39187771112176',
//         longitude: '2.1850347518920903',
//         isItOver: false,
//     }
// ]

Event.create(events, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${events.length} events`)
    mongoose.connection.close();
});