function assertEqual(a, b) {
    if (a === b) {
      console.log("🎉 Yay", a, b);
    } else {
      console.log("😭 Oops", a, b);
    }
}
exports.assertEqual = assertEqual;