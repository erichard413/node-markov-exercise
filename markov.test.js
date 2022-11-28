const markov = require("./markov")

let mm = new markov.MarkovMachine("the cat in the hat");

describe("makeChains", function () {
    test("test make chains function", function () {
      let chain = mm.makeChains();
      expect(chain).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [undefined]});
    });
  });

describe("getNextWord", function () {
    test("test getNextWord function - with input CAT this will output 'in'", function(){
        let chain = mm.makeChains();
        let word = mm.getNextWord("cat", chain);
        expect(word).toEqual("in");
    })
    test("test getNextWord function - with input HAT this will output undefined", function(){
        let chain = mm.makeChains();
        let word = mm.getNextWord("hat", chain);
        expect(word).toEqual(undefined);
    })
})

describe("makeParagraph", function() {
    test("test make paragraph function - should take in an array of strings, and output a sentence", function(){
        let chain = mm.makeChains();
        let testArr = ["this", "is", "just", "a", "test", "bro"]
        let res = mm.makeParagraph(testArr);
        expect(res).toEqual("this is just a test bro")
    })
})

describe("makeText", function(){
    test("test makeText paragraph function - should output a sentence of varying lengths", function(){
        let res = mm.makeText()
        expect(res).toEqual(expect.any(String))
    })
})
describe("makeText", function(){
    test("test makeText paragraph function - should output a string that contains HAT", function(){
        let res = mm.makeText()
        expect(res).toEqual(expect.stringContaining('hat'))
    })
})