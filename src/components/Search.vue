<template>
  <div class="search-input">
    <div class="shortcut">F</div>
    <input
      ref="searchInput"
      type="text"
      placeholder="Hit F key to search..."
      maxlength="40"
      v-model="searchTerm"
      @keyup.enter="triggerSearch"
      @keyup.escape="clearSearch"
      @focus="focus"
      @blur="blur"
    />
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      isTheUserTyping: false,
      searchTerm: ''
    };
  },
  mounted() {
    window.addEventListener('keydown', this.setKeyListener);
  },
  destroyed() {
    window.removeEventListener('keydown', this.setKeyListener);
  },
  methods: {
    setKeyListener: function(event) {
      // listen for the `f` shortcut to focus on input
      if (!this.isTheUserTyping && event.keyCode === 70) {
        event.preventDefault();
        // setTimeout(() => {

        // }, 50);
        this.$refs.searchInput.focus();
        this.$refs.searchInput.select();
      }
    },
    triggerSearch: function() {
      if (this.searchTerm !== '') {
        this.$refs.searchInput.blur();
        this.$emit('search-for', this.searchTerm);
      }
    },
    clearSearch: function() {
      this.searchTerm = '';
      this.$refs.searchInput.blur();
      this.$emit('clear');
    },
    focus: function() {
      this.isTheUserTyping = true;
      this.$emit('user-is-typing', true);
    },
    blur: function() {
      this.isTheUserTyping = false;
      this.$emit('user-is-typing', false);
    }
  }
}
</script>

<style scoped>
  .search-input {
    display: flex;
    align-items: center;
  }
  .search-input .shortcut {
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
  .search-input input {
    font-family: 'Quicksand', sans-serif;
    background: transparent;
    border: none;
    font-size: 40px;
    line-height: 40px;
    height: 40px;
    color: #E8B3F0;
    text-transform: uppercase;
    outline: none;
    padding: 0;
    width: 100%;
  }
  .search-input input::placeholder {
    color: #372A8E;
  }
</style>
