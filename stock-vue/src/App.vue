<template>
  <div id="app">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  class="
                    bg-gray-900
                    text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  aria-current="page"
                  >Dashboard</a
                >

                <a
                  href="#"
                  class="
                    text-gray-300
                    hover:bg-gray-700
                    hover:text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >Team</a
                >

                <a
                  href="#"
                  class="
                    text-gray-300
                    hover:bg-gray-700
                    hover:text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >Projects</a
                >

                <a
                  href="#"
                  class="
                    text-gray-300
                    hover:bg-gray-700
                    hover:text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >Calendar</a
                >

                <a
                  href="#"
                  class="
                    text-gray-300
                    hover:bg-gray-700
                    hover:text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >Reports</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div
            class="border-4 border-dashed border-gray-200 rounded-lg h-96"
          >
            <router-view></router-view>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>


