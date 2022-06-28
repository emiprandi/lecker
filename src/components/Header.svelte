<script>
  import { search } from '../api/spotify';
  import { searchResults } from '../stores';

  import Shortcut from './Shortcut.svelte';

  let input;
  let searchQuery = '';

  const handleSearch = async (e) => {
    if (e.code === 'Enter' && searchQuery.trim() !== '') {
      e.target.blur();
      const { albums: { items } } = await search(searchQuery.trim());
      $searchResults = items;
    }
  };

  export const focus = () => {
		searchQuery = '';
    input.focus();
	};
</script>

<div class="search">
  <Shortcut key='S' />
  <input
    bind:this={input}
    bind:value={searchQuery}
    on:keydown|stopPropagation={handleSearch}
    type="text"
    maxlength="35"
    placeholder="Search"
  />
</div>
<div class="logo">LECKER</div>

<style>
  .search {
    flex: 1;
    display: flex;
    align-items: center;
  }

  input {
    font-family: 'Quicksand', sans-serif;
    background: transparent;
    border: none;
    font-size: 40px;
    line-height: 40px;
    height: 40px;
    color: #E8B3F0;
    text-transform: uppercase;
    outline: none;
    padding: 0 30px 0 0;
    width: 100%;
    margin-left: 30px;
  }

  input::placeholder {
    color: #372A8E;
  }

  .logo {
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;
    text-align: right;
    color: #372A8E;
    opacity: 0.5;
    flex: 0 250px;
  }
</style>
