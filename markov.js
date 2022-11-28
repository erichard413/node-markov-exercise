/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordsArr = this.words
    let chain = {}
    for (let i = 0; i < wordsArr.length; i++){
        let word = wordsArr[i]
        if (chain[word]) {
          chain[word].push(wordsArr[i+1])
        } else {
          chain[word] = [wordsArr[i+1]]
        }
      }
    return chain
    }
  /** return random text from chains */
  
  getNextWord(key, chain) {
    let words = chain[key]
    if (words.length == 1) {
      return words[0];
    }
    let idx = Math.floor((Math.random() * words.length))
    return (words[idx] !== undefined) ? words[idx] : null;
  }

  makeParagraph(wordArr) {
    let output = ""
    for (let i = 0; i<wordArr.length; i++){
      if (i > 0) {
        output += ` ${wordArr[i]}`
      } else {
        output += `${wordArr[i]}`
      }
    }
    console.log(output)
    return output
  }

  makeText(numWords = 100) {
    let chain = this.makeChains()
    let keys = Object.keys(chain)
    let keyIdx = Math.floor((Math.random() * keys.length))
    let randomWord = keys[keyIdx]
    let newTextArr = []
    newTextArr.push(randomWord)
    for (let i = 0; i < numWords; i++) {
      let res = this.getNextWord(randomWord, chain)
      if (res === undefined) {
        break
      } else {
        newTextArr.push(res)
        randomWord = res
      }
    }
    let newText = this.makeParagraph(newTextArr)
    return newText;
  }


}


module.exports = {
  MarkovMachine
};

