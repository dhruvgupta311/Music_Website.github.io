
const music = new Audio('audio/arijit/1.mp3');

const songs = [
  {
    id: 1,
    songName: `On My Way<br><div class='subtitle'>Alan Walker</div>`,
    poster: "img/images/img1.jpeg"
  },
  {
    id: 2,
    songName: `One Love<br><div class='subtitle'>Shubh</div>`,
    poster: "img/images/img2.jpeg"
  },
  {
    id: 3,
    songName: `Chandni <br><div class='subtitle'>Sanchit tandan</div>`,
    poster: "img/images/img3.jpeg"
  },
  {
    id: 4,
    songName: `Dj Wale babu <br><div class='subtitle'>Badshah</div>`,
    poster: "img/images/img4.jpeg"
  },
  {
    id: 5,
    songName: `Hip Hop<br><div class='subtitle'>Honey Singh</div>`,
    poster: "img/images/img5.jpeg"
  },
  {
    id: 6,
    songName: `Desi kalakar <br><div class='subtitle'>Honey Singh</div>`,
    poster: "img/images/img6.jpeg"
  }
];

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
  e.getElementsByTagName('img')[0].src = songs[i].poster;
  e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
  // song item ki list ka array bnaya h 
});


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    wave.classList.add('active');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

  }else{
    music.pause();
    masterPlay.classList.remove('bi-pause-fill');
    masterPlay.classList.add('bi-play-fill');
    wave.classList.remove('active');
  }
});


let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click', () => {
  pop_song.scrollLeft += 330;
});

pop_song_left.addEventListener('click', () => {
  pop_song.scrollLeft -= 330;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let item = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', () => {
  item.scrollLeft += 330;
});

pop_art_left.addEventListener('click', () => {
  item.scrollLeft -= 330;
});

const makeAllplays = () => {
  Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
    el.classList.remove('bi-pause-circle-fill');
    el.classList.add('bi-play-circle-fill');
  });
};

const makeAllBackground = () => {
  Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
    el.style.background = 'rgb(105, 105, 105,.0)';
  });
};

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
  e.addEventListener('click', (el) => {
    const index = el.target.id;
    music.src = `audio/arijit/${index}.mp3`;
    poster_master_play.src = `img/images/img${index}.jpeg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href=`audio/arijit/${index}.mp3`;
    let songTitles = songs.filter((els) => els.id == index);

    songTitles.forEach((elss) => {
      let { songName } = elss;
      title.innerHTML = songName;
      download_music.setAttribute('download', songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active');
  });
});


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;
  let min1 = Math.floor(music_dur / 60);
  let sec1 = Math.floor(music_dur % 60);

  // Pad the seconds with leading zero if less than 10
  if (sec1 < 10) {
    sec1 = '0' + sec1;
  }
  currentEnd.innerText = `${min1}:${sec1}`;
  let min2 = Math.floor(music_curr / 60);
  let sec2 = Math.floor(music_curr % 60);

  // Pad the seconds with leading zero if less than 10
  if (sec2 < 10) {
    sec2 = `0${sec2}`;
  }

  currentStart.innerText = `${min2}:${sec2}`;
  let progressBar = parseInt((music_curr / music_dur) * 100);
  seek.value = progressBar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;

  seek.addEventListener('change', () => {
    music.currentTime = (seek.value / 100) * music.duration;
  });
  let vol_icon = document.getElementById('vol_icon');
  let vol = document.getElementById('vol');
  let vol_bar = document.getElementsByClassName('vol_bar')[0]; // Note: Assuming you want the first element with the class 'vol_bar'
  let vol_dot = document.getElementById('vol_dot');
  vol.addEventListener('change', () => {
    if (vol.value == 0) {
      vol_icon.classList.remove('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
      vol_icon.classList.remove('bi-volume-off-fill');
      vol_icon.classList.add('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
      vol_icon.classList.add('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-off-fill');
    } else if (vol.value > 0) {
      vol_icon.classList.remove('bi-volume-off-fill');
      vol_icon.classList.add('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;

    // Add additional conditions or actions based on different volume levels if needed
  });

  let back = document.getElementById("back");
  let next = document.getElementById('next');

  back.addEventListener('click',()=>{
    index--; 
    if(index<1){
      index=Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/arijit/${index}.mp3`;
    poster_master_play.src = `img/images/img${index}.jpeg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    let songTitles = songs.filter((els)=>els.id==index);

    songTitles.forEach((elss) => {
      let { songName } = elss;
      title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active');
  });

  next.addEventListener('click',()=> {
    index++;
    if (index >6) {
      index = 1;
    }
    
    music.src = `audio/arijit/${index}.mp3`;
    poster_master_play.src = `img/images/img${index}.jpeg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    let songTitles = songs.filter((els) => els.id == index);

    songTitles.forEach((elss) => {
      let { songName } = elss;
      title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active');
  });

});
let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
  let a = shuffle.innerHTML;

  switch (a){
    case "next":
      shuffle.classList.add('bi-arrow-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML = 'repeat';
      break;
      case "repeat":
        shuffle.classList.remove('bi-arrow-repeat');
        shuffle.classList.remove('bi-music-note-beamed');
        shuffle.classList.add('bi-shuffle');
        shuffle.innerHTML = 'random';
        break;
      case "random": 
        shuffle.classList.remove('bi-arrow-repeat');
        shuffle.classList.add('bi-music-note-beamed');
        shuffle.classList.remove('bi-shuffle');
        shuffle.innerHTML = 'next';
        break;
  }
});

// music.addEventListener('ended', () => {
//   // index++;
//   if (index == songs.length) {
//     index = 1;
//   }else{
//     index++;
//   }  
//     music.src = `audio/${index}.mp3`;
//     poster_master_play.src = `img/img${index}.jpeg`;
//     music.play();
//     masterPlay.classList.remove('bi-play-fill');
//     masterPlay.classList.add('bi-pause-fill');
//     download_music.href=`audio/${index}.mp3`;
//     let songTitles = songs.filter((els) => els.id == index);

//     songTitles.forEach((elss) => {
//       let { songName } = elss;
//       title.innerHTML = songName;
//       download_music.setAttribute('download', songName);
//     });
//     makeAllBackground();
//     Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
//     makeAllplays();
//     el.target.classList.remove('bi-play-circle-fill');
//     el.target.classList.add('bi-pause-circle-fill');
//     wave.classList.add('active');
// });

const next_music = () => {
  if (index === songs.length - 1) {
    index = 0;
  } else {
    index++;
  }
  music.src = `audio/arijit/${index}.mp3`;
  poster_master_play.src = `img/images/img${index}.jpeg`;
  music.play();
  masterPlay.classList.remove('bi-play-fill');
  masterPlay.classList.add('bi-pause-fill');
  download_music.href=`audio/arijit/${index}.mp3`;
  let songTitles = songs.filter((els) => els.id == index);

  songTitles.forEach((elss) => {
    let { songName } = elss;
    title.innerHTML = songName;
    download_music.setAttribute('download', songName);
  });
  makeAllBackground();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllplays();
  el.target.classList.remove('bi-play-circle-fill');
  el.target.classList.add('bi-pause-circle-fill');
  wave.classList.add('active');
};

const repeat_music = () => {
  index;
  music.src = `audio/arijit/${index}.mp3`;
  poster_master_play.src = `img/images/img${index}.jpeg`;
  music.play();
  masterPlay.classList.remove('bi-play-fill');
  masterPlay.classList.add('bi-pause-fill');
  download_music.href=`audio/arijit/${index}.mp3`;
  let songTitles = songs.filter((els) => els.id == index);

  songTitles.forEach((elss) => {
    let { songName } = elss;
    title.innerHTML = songName;
    download_music.setAttribute('download', songName);
  });
  makeAllBackground();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllplays();
  el.target.classList.remove('bi-play-circle-fill');
  el.target.classList.add('bi-pause-circle-fill');
  wave.classList.add('active');
};

const random_music = () => {
  if (index == songs.length) {
    index = 1;
  } else {
    index = Math.floor((Math.random() * songs.length)+1);
  }
  
  music.src = `audio/arijit/${index}.mp3`;
  poster_master_play.src = `img/images/img${index}.jpeg`;
  music.play();
  masterPlay.classList.remove('bi-play-fill');
  masterPlay.classList.add('bi-pause-fill');
  download_music.href=`audio/arijit/${index}.mp3`;
  let songTitles = songs.filter((els) => els.id == index);

  songTitles.forEach((elss) => {
    let { songName } = elss;
    title.innerHTML = songName;
    download_music.setAttribute('download', songName);
  });
  makeAllBackground();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllplays();
  el.target.classList.remove('bi-play-circle-fill');
  el.target.classList.add('bi-pause-circle-fill');
  wave.classList.add('active');
};
music.addEventListener('ended', () => {
  let b = shuffle.innerHTML;

  switch (b) {
      case 'repeat':
          repeat_music();
          break;
      case 'next':
          next_music();
          break;
      case 'random':
          random_music();
          break;
  }
});