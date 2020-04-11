<template>
  <input
    id="searchBox"
    ref="searchInput"
    type="text"
    maxlength="40"
    v-model="searchTerm"
    @keyup.enter="triggerSearch"
    @keyup.escape="clearSearch"
    @focus="focus"
    @blur="blur"
  />
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
      // listen for the `:` shortcut to focus on input
      if (!this.isTheUserTyping && event.shiftKey && event.keyCode === 186) {
        event.preventDefault();
        setTimeout(() => {
          this.$refs.searchInput.focus();
          this.$refs.searchInput.select();
        }, 50);
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
  #searchBox {
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
</style>
