const mongoose = require("mongoose");
const User = require("../models/user");

const dbName = "palcony";
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
User.collection.drop();

const users = [
  {
    name: "F. Franco",
    email: "matarrojos@gmail.com",
    password: "asdgasdgasdgasdg",
    description: String,
    latitude: '41.39654586166389',
    longitude: '2.184197902679444',

  },

  {
    name: "M. Fraga",
    email: "banhoradiactivo@hotmail.com",
    password: "asdfasdfasdf",
    description: String,
    latitude: '41.392666491129376',
    longitude: '2.177503108978272',

  },

  {
    name: "Marta Sanchez",
    email: "msan@memolo.com",
    password: "shsrthrshrshrth",
    description:
      "Es un sueño, no podía pensar que iba a revolucionar el país de esta manera",
    latitude: '41.38796586476439',
    longitude: '2.182374000549317',

  },
  

  
  {
    name: "Ronaoldinho",
    email: "estoybordandolacuarena@asdfasdf.com",
    password: "asdgfasdgewgewgaegeg",
    description: "Ronaldo de Assis Moreira, conocido deportivamente como Ronaldinho, es un exjugador de fútbol brasileño nacionalizado español. Es mundialmente reconocido como uno de los talentos más grandes en la historia de dicho deporte.",

    latitude: '41.38727362052774',
    longitude: '2.176430225372315',

  },
    {
    name: "Antonio Cassano",
    email: "estoybordandolacuarena@asdfasdf.com",
    password: "asdgfasdgewgewgaegeg",
    description: 'Cassano aprendió a jugar al fútbol en las difíciles calles del barrio más peligroso de Bari. Un día un ojeador del Bari se fijó en él cuando tenía 5 años e ingresó en las filas del club. Debutó en el año 1999 en un derbi del sur entre el Lecce y su equipo el Bari, consiguiendo ese mismo año el ascenso a la Serie A. En su segundo partido, contra el Internazionale, marcó su primer gol en la categoría, un gol antológico: con un control de tacón a un pase largo se enfrentó a los defensas interistas, tras romper la cintura de Christian Panucci y el francés Laurent Blanc, finalmente batió al portero interista.',
    latitude: '41.39284356287685',
    longitude: '2.1800565719604497',

  },
  {
    name: "Antonio Cassano",
    email: "fiesta@asdfasdf.com",
    password: "asdgfasdgewgewgaegeg",
    description: 'Cassano aprendió a jugar al fútbol en las difíciles calles del barrio más peligroso de Bari. Un día un ojeador del Bari se fijó en él cuando tenía 5 años e ingresó en las filas del club. Debutó en el año 1999 en un derbi del sur entre el Lecce y su equipo el Bari, consiguiendo ese mismo año el ascenso a la Serie A. En su segundo partido, contra el Internazionale, marcó su primer gol en la categoría, un gol antológico: con un control de tacón a un pase largo se enfrentó a los defensas interistas, tras romper la cintura de Christian Panucci y el francés Laurent Blanc, finalmente batió al portero interista.',
    latitude: '41.39187771112176',
    longitude: '2.1850347518920903',

  },
  {
    name: "Ivan Campo",
    email: "pakete@asdfasdf.com",
    password: "asdgfasdgewgewgaegeg",
    description: 'Iván Campo es un futbolista retirado español que jugó de defensa. Iván Campo saltó a la fama nacional, tras una gran temporada en aquel RCD Mallorca de Héctor Cúper formando pareja de centrales con el asturiano Marcelino Elena, ayudando al equipo balear a finalizar la temporada en quinta posición.',
    latitude: '41.39277917320631',
    longitude: '2.176280021667481',

    }  ];

User.create(users, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});


