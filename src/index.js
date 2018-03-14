module.exports = function longestConsecutiveLength(array) {
  if (array.length == 0) {
    return 0;
  }

  let newObject = {};
  let maxConsecutive = [];

  function convertToObject () {
    array.forEach(element => {
      newObject[element] = element;
    });
  }

  function searchNeighborPLus (e) {
    let neighbor = 0;
    let ePlusOne = e + 1;

    if (newObject[ePlusOne]) {
      neighbor = ePlusOne;
    }
    
    return neighbor;
  }

  function searchNeighborMinus (e) {
    let neighbor = 0;
    let eMinusOne = e - 1;

    if (newObject[eMinusOne]) {
      neighbor = eMinusOne;
    }

    return neighbor;
  }

  function search() {
    for(let k in newObject) {
      let key = +k;
      let maybeMaxConsecutive = [key];
      let neighborPlus = searchNeighborPLus(key);
      let neighborMinus = searchNeighborMinus(key);
      delete newObject[k];

      while (neighborPlus != 0) {
        maybeMaxConsecutive.push(neighborPlus);
        let newNeighborPlus = searchNeighborPLus(neighborPlus);
        delete newObject[neighborPlus];
        neighborPlus = newNeighborPlus;
      }

      while (neighborMinus != 0) {
        maybeMaxConsecutive.push(neighborMinus);
        let newNeighborMinus = searchNeighborPLus(neighborMinus);
        delete newObject[neighborMinus];
        neighborMinus = newNeighborMinus;
      }

      if (maybeMaxConsecutive.length > maxConsecutive.length) {
        maxConsecutive = maybeMaxConsecutive;
      }
    }
  }

  convertToObject();
  search();
  
  return maxConsecutive.length;
}
