'use strict';

class GitLogsFormatter {
  constructor(keys) {
    this.keys = [
      "%H",
      "%T",
      "%P",
      "%an",
      "%ae",
      "%al",
      "%aL",
      "%ad",
      "%ar",
      "%at",
      "%aI",
      "%as",
      "%cn",
      "%ce",
      "%cl",
      "%cL",
      "%cd",
      "%cr",
      "%ct",
      "%cI",
      "%cs",
      "%d",
      "%D",
      "%S",
      "%e",
      "%s",
      "%f",
      "%b",
      "%B",
      "%N",
      "%GG",
      "%G?",
      "%GS",
      "%GK",
      "%GF",
      "%GP",
      "%GT",
      "%gD",
      "%gd",
      "%gn",
      "%gN",
      "%ge",
      "%gE",
      "%gs"
    ];
    this.format = "";
    if (keys) {
      this.keys = keys;
    }
  }
  getFormat(keys) {
    if (keys && keys.length)
      this.keys = keys;
    this.format = `-start-${this.keys.join(",=")}-end-`;
    return this.format;
  }
  getLogs(stdout) {
    const list = [];
    if (stdout) {
      const match = stdout.replace(/^-start-|-end-$/g, "").replace(/-end-([.\n]+)-start-/g, "-split-").split("-split-") || [];
      for (const log of match) {
        const args = log.split(",=");
        const map = {};
        this.keys.forEach((key, i) => {
          map[key] = args[i];
        });
        list.push(map);
      }
    }
    return list;
  }
}
module.exports = GitLogsFormatter;