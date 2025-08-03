<template>
  <div class="controls text-center mb-4 flex justify-center gap-2">
    <button @click="useMyArticleStyleStore().increaseFontSize">
      Increase Font Size
    </button>
    <button @click="useMyArticleStyleStore().resetFontSize">
      Reset Font Size
    </button>
    <button @click="useMyArticleStyleStore().toggleBackgroundColor">
      Toggle Background Color
    </button>
    <button @click="useMyArticleStyleStore().toggleTextColor">
      Toggle Text Color
    </button>
    <button @click="useMyArticleStyleStore().increaseLineHeight">
      Increase Line Height
    </button>
    <button @click="useMyArticleStyleStore().resetLineHeight">
      Reset Line Height
    </button>
    <button @click="useMyArticleStyleStore().increaseMargin">
      Increase Margin
    </button>
    <button @click="useMyArticleStyleStore().resetMargin">Reset Margin</button>
  </div>
</template>
