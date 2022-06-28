<script>
  import { nowPlaying } from '../stores';
  import { getImageUrlBySize } from '../utils';
</script>

<p>Now Playing:</p>
<div class="context">{$nowPlaying.context.name}</div>

<p>Up Next:</p>
{#each $nowPlaying.context.next_items as track}
  <div class="track">
    <div class="image" style="background-image: url({getImageUrlBySize(track.images, 64)})"></div>
    <div class="info">
      <div class="info-name">{track.name}</div>
      <div class="info-artists">{track.artists.map((artist) => artist.name).join(', ')}</div>
    </div>
  </div>
{/each}

<style>
  p {
    margin: 0;
    color: #695ACA;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
  }
  .context {
    font-size: 14px;
    font-weight: 700;
    color: #E8B3F0;
    line-height: 20px;
    text-transform: uppercase;
    margin: 5px 0 30px;
  }

  .track {
    color: #695ACA;
    display: flex;
    text-transform: uppercase;
    margin: 10px 0 15px;
  }

  .image {
    flex: 0 0 40px;
    height: 40px;
    border-radius: 2px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
  }
  .info {
    flex: 1;
    margin-left: 10px;
  }
  .info-name {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #E8B3F0;
  }
  .info-artists {
    font-size: 12px;
    line-height: 20px;
  }
</style>
