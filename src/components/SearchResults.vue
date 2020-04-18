<template>
  <div>
    <a
      class="search-result"
      href="#"
      v-for="(result, index) in results"
      :key="result.id"
      @click.prevent="$emit('result-selected', result)"
    >
      <div class="shortcut">{{index + 1}}</div>
      <div class="image" :style="{ backgroundImage: `url('${result.images[1].url}')` }"></div>
      <div class="info">
        <div class="info-primary">{{result.name}}</div>
        <div class="info-secondary">
          <div class="artists">{{ listArtists(result.artists) }}</div>
          <div class="tracks">{{ numberOfTracks(result.total_tracks) }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'search-results',
  props: {
    results: Array
  },
  mounted() {
    window.addEventListener('keydown', this.setResultsListener);
  },
  destroyed() {
    window.removeEventListener('keydown', this.setResultsListener);
  },
  methods: {
    setResultsListener: function(event) {
      // listen for the `[1-8]` shortcut to start playing
      if (this.results.length > 0 && event.keyCode >= 49 && event.keyCode <= 56) {
        event.preventDefault();
        this.$emit('result-selected', this.results[event.keyCode - 49]);
      }
    },
    listArtists: function(artists) {
      return artists.map((artist) => artist.name).join(', ');
    },
    numberOfTracks: function(tracks) {
      return `${tracks} ${tracks === 1 ? 'song' : 'songs' }`
    }
  },
}
</script>

<style scoped>
  .search-result {
    color: #695ACA;
    display: flex;
    align-items: flex-start;
    min-height: 60px;
    line-height: 20px;
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 30px;
  }
  .search-result .shortcut {
    flex: 0 0 8px;
    min-width: 8px;
    background: #FFEF66;
    color: #1A0E6A;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
    padding: 0 5px;
    margin-right: 30px;
  }
  .search-result .image {
    flex: 0 0 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
  }
  .search-result .info {
    flex: 1 1 auto;
  }
  .search-result .info .info-primary {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: #E8B3F0;
    margin-bottom: 5px;
  }
  .search-result .info .info-secondary {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .search-result .info .info-secondary .artists {
    margin-right: 20px;
  }
  .search-result .info .info-secondary .tracks {
    white-space: nowrap;
  }
</style>
