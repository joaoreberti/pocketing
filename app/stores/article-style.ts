import { defineStore } from "pinia";

export const useMyArticleStyleStore = defineStore("myArticleStyle", {
  state: () => ({
    backgroundColor: "#ffffff", // Default background color
    textColor: "#000000", // Default text color
    lineHeight: "1.6", // Default line height
    margin: 20, // Default margin in pixels
    fontSize: 16, // Default font size
  }),
  getters: {
    articleStyle: (state) => ({
      backgroundColor: state.backgroundColor,
      color: state.textColor,
      lineHeight: state.lineHeight,
      marginLeft: `${state.margin}px`,
      marginRight: `${state.margin}px`,
      fontSize: `${state.fontSize}px`,
    }),
  },
  actions: {
    setBackgroundColor(color: string) {
      this.backgroundColor = color;
    },
    setTextColor(color: string) {
      this.textColor = color;
    },
    setLineHeight(height: string) {
      this.lineHeight = height;
    },
    setMargin(margin: number) {
      this.margin = margin;
    },
    setFontSize(size: number) {
      this.fontSize = size;
    },
    increaseFontSize() {
      this.fontSize += 2; // Increase font size by 2px
    },
    resetFontSize() {
      this.fontSize = 16; // Reset to default font size
    },
    toggleBackgroundColor() {
      this.backgroundColor =
        this.backgroundColor === "#ffffff" ? "#f0f0f0" : "#ffffff"; // Toggle between white and light gray
    },
    toggleTextColor() {
      this.textColor = this.textColor === "#000000" ? "#333333" : "#000000"; // Toggle between black and dark gray
    },
    increaseLineHeight() {
      this.lineHeight = (parseFloat(this.lineHeight) + 0.2).toFixed(1); // Increase line height by 0.2
    },
    resetLineHeight() {
      this.lineHeight = "1.6"; // Reset to default line height
    },
    increaseMargin() {
      this.margin += 5; // Increase margin by 5px
    },
    resetMargin() {
      this.margin = 20; // Reset to default margin
    },
  },
});
