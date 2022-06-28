<script>
  import { nowPlaying, progressBar } from '../stores';
  import { getImageUrlBySize } from '../utils';
</script>

<div class="artwork" style="background-image: url('{getImageUrlBySize($nowPlaying.track.album.images, 640)}');"></div>
<div class="progress-bar" style="width: {$progressBar}%;"></div>
<h1>{$nowPlaying.track.name}</h1>
<p>{$nowPlaying.track.artists.map((artist) => artist.name).join(', ')}</p>

<style>
  .artwork {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2px;
    width: 300px;
    height: 300px;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.20) inset;
    box-sizing: border-box;
  }
  .progress-bar {
    height: 3px;
    background-color: #695ACA;
    border-radius: 2px;
    margin-top: 2px;
  }
  h1 {
    margin: 10px 0 5px;
    font-size: 24px;
    line-height: 30px;
    text-transform: uppercase;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #695ACA;
    text-transform: uppercase;
  }
</style>
