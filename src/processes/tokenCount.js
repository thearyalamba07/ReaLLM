function numTokens(text) {
  const assert = require("assert");
  const { get_encoding } = require("tiktoken");

  const enc = get_encoding("gpt2");

  const encoded = enc.encode(text);
  const decoded = new TextDecoder().decode(encoded);

  const numToken = encoded.length;

  enc.free();
  return numToken;
}

module.exports = {
  numTokens,
};
