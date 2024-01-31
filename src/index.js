import "./style.css";

console.log("Hello world");

export default function capitalize(word) {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalized;
}
