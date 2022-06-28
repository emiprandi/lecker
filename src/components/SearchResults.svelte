<script>
  import { searchResults } from '../stores';
  import { getImageUrlBySize } from '../utils';

  import Shortcut from './Shortcut.svelte';
</script>

{#each $searchResults as result, i}
  <div class="result">
    <Shortcut key={i + 1} />
    <div class="image" style="background-image: url({getImageUrlBySize(result.images, 300)})"></div>
    <div class="info">
      <div class="info-primary">{result.name}</div>
      <div class="info-secondary">
        <div class="artists">{result.artists.map((artist) => artist.name).join(', ')}</div>
        <div class="tracks">{result.total_tracks} track{result.total_tracks > 1 ? 's' : ''}</div>
      </div>
    </div>
  </div>
{/each}

<style>
  .result {
    color: #695ACA;
    display: flex;
    align-items: flex-start;
    min-height: 60px;
    line-height: 20px;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  .image {
    flex: 0 0 60px;
    height: 60px;
    border-radius: 2px;
    margin-left: 30px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
  }
  .info {
    flex: 1;
    margin-left: 15px;
  }
  .info-primary {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: #E8B3F0;
    margin-bottom: 5px;
  }
  .info-secondary {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .info-secondary > .artists {
    margin-right: 20px;
  }
  .info-secondary > .tracks {
    white-space: nowrap;
  }
</style>
