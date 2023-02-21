import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_TIME = 'videoplayer-current-time';

const timeSum = localStorage.getItem(KEY_TIME);
if (timeSum !== null) {
  player.setCurrentTime(timeSum);
}

function timeUpdate(e) {
  localStorage.setItem(KEY_TIME, e.seconds);
}

player.on('timeupdate', throttle(timeUpdate, 1000));
