export function removeEmoji(text) {
  return text.replace(
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
    ""
  );
}