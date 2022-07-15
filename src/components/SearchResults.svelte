<script>
  import { searchResults, searchPaginationCurrentPage } from '../stores';
  import { getImageUrlBySize } from '../utils';

  import Shortcut from './Shortcut.svelte';

  export let resultsPerPage;
</script>

{#each {length: resultsPerPage} as _, i}
  <div class="result">
    <Shortcut key={i + 1} />
    <div class="image" style="background-image: url({getImageUrlBySize($searchResults[$searchPaginationCurrentPage * resultsPerPage + i].images, 300)})"/>
    <div class="info">
      <div class="info-primary">{$searchResults[$searchPaginationCurrentPage * resultsPerPage + i].name}</div>
      <div class="info-secondary">
        <div class="artists">{$searchResults[$searchPaginationCurrentPage * resultsPerPage + i].artists.map((artist) => artist.name).join(', ')}</div>
        <div class="tracks">{$searchResults[$searchPaginationCurrentPage * resultsPerPage + i].total_tracks} track{$searchResults[$searchPaginationCurrentPage * resultsPerPage + i].total_tracks > 1 ? 's' : ''}</div>
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
    line-height: 20px;
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
