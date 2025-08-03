<template>
  <header
    class="w-full tricolor bg-gray-100 pl-16 pr-16 flex justify-between items-center border-b border-gray-200 shadow-2xl"
  >
    <HeaderActions />
    <HeaderLogo />
    <HeaderSearch />
  </header>
</template>

<style scoped>
.tricolor {
  background: linear-gradient(
      to left,
      darkGoldenRod 0,
      darkGoldenRod 25%,
      orangeRed 25%,
      orangeRed 50%,
      darkCyan 50%,
      darkCyan 75%,
      aquamarine 75%,
      aquamarine 100%
    )
    no-repeat;
  background-size: 100% 3px;
}
</style>
