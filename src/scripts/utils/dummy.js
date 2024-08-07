const html = (arr, ...val) => {
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    result += (arr[i] || "") + (val[i] || "");
  }
  return result;
};
export default html;
