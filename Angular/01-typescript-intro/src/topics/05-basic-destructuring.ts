interface Details {
  author: string;
  year: number;
}

interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Static",
  details: {
    author: "Luke Chiang",
    year: 2024,
  },
};

const song = "New song";

const {
  songDuration,
  song: anotherSong,
  details: { author },
} = audioPlayer;

// console.log("Song duration: ", songDuration);
// console.log("Song: ", anotherSong);
// console.log("Author: ", author);

// const [, , name = "Not found"] = ["Ana", "Pepe", "Lara"];
const [, , name = "Not found"] = ["Ana", "Pepe"];
console.log(name);

export {};
