<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <!-- Navbar -->
    <nav class="bg-gray-950 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div class="flex items-center gap-3">
        <span class="text-xl font-semibold">TMDB</span>
      </div>

      <div class="hidden md:flex gap-6 text-sm text-gray-300">
        <a href="#" class="hover:text-white">Movies</a>
        <a href="#" class="hover:text-white">TV Shows</a>
        <a href="#" class="hover:text-white">People</a>
        <a href="#" class="hover:text-white">More</a>
      </div>

      <div class="flex items-center gap-4 text-gray-300">
        <font-awesome-icon :icon="['fas', 'search']" class="cursor-pointer hover:text-white" />
        <select class="bg-gray-800 px-2 py-1 rounded text-sm focus:outline-none">
          <option>EN</option>
          <option>FR</option>
        </select>
      </div>
    </nav>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-[80vh]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
    </div>

    <!-- Movie Details -->
    <div v-else class="max-w-6xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
      <!-- Poster -->
      <div class="md:w-1/3 w-full">
        <img :src="movie.Poster" alt="Poster" class="rounded-xl shadow-lg w-full" />
        <div class="bg-blue-700 mt-4 text-sm text-white px-4 py-2 rounded-full w-fit">Now Streaming</div>
      </div>

      <!-- Details -->
      <div class="md:w-2/3 w-full space-y-4">
        <h1 class="text-2xl md:text-4xl font-bold">
          {{ movie.Title }}
          <span class="text-gray-400 text-xl md:text-2xl">({{ movie.Year }})</span>
        </h1>

        <div class="text-sm text-gray-300">
          {{ movie.Released }} • {{ movie.Genre }} • {{ movie.Runtime }}
        </div>

        <!-- Score and Buttons -->
        <div class="flex flex-wrap items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-xl font-bold">
            {{ rating }}
          </div>
          <span>User Score</span>

          <div class="flex gap-2">
            <button class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600">
              <font-awesome-icon icon="fa-solid fa-list" />
            </button>
            <button class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600">
              <font-awesome-icon icon="fa-solid fa-heart" />
            </button>
            <button class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600">
              <font-awesome-icon icon="fa-solid fa-bookmark" />
            </button>
            <button class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600">
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
          </div>

          <a
            :href="`https://www.youtube.com/results?search_query=${movie.Title} trailer`"
            target="_blank"
            class="ml-auto flex items-center gap-2 bg-white text-black px-4 py-1 rounded-full hover:bg-gray-200"
          >
            <font-awesome-icon icon="fa-solid fa-play" />
            Play Trailer
          </a>
        </div>

        <!-- Overview -->
        <div>
          <h2 class="text-xl font-semibold mt-4">Overview</h2>
          <p class="text-gray-200 mt-1">{{ movie.Plot }}</p>
        </div>

        <!-- Crew -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-sm">
          <div v-for="(member, i) in crew" :key="i">
            <p class="font-bold">{{ member.name }}</p>
            <p class="text-gray-400">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      movie: {},
    };
  },
  computed: {
    rating() {
      const rating = parseFloat(this.movie.imdbRating);
      return isNaN(rating) ? "N/A" : `${Math.round(rating * 10)}%`;
    },
    crew() {
      return [
        { name: this.movie.Director, role: "Director" },
        ...(this.movie.Writer?.split(", ") || []).map(w => ({ name: w, role: "Writer" })),
        ...(this.movie.Actors?.split(", ") || []).map(a => ({ name: a, role: "Actor" })),
      ];
    },
  },
  async mounted() {
    try {
      const res = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=d2132124");
      this.movie = await res.json();
    } catch (e) {
      console.error("Error fetching movie:", e);
    } finally {
      this.loading = false;
    }
  },
};
</script>
