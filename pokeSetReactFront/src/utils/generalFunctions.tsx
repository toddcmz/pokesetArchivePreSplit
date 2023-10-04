import { Card } from "../components/GameBoard"
import allPokemonList from "./allPokemonList.json"

// used in getRandomPmon. Will need to find up to three random pokemon.
const maxPmonNeeded = 3

// logic for counting how many sets there are
export function checkForSets(boardCards:Card[]):number{
    
  let totalSetsOnBoard = 0

  let theseCards = boardCards

  let boardSize = theseCards.length

  // loop through all possible combos of 3 cards
  for(let c1=0; c1<boardSize-2; c1++ ){
      for(let c2=c1+1; c2<boardSize-1; c2++){
          for(let c3=c2+1; c3<boardSize; c3++){
              let borderSet = new Set([theseCards[c1].cardBorder, theseCards[c2].cardBorder, theseCards[c3].cardBorder])
              let backgroundSet = new Set([theseCards[c1].cardBack, theseCards[c2].cardBack, theseCards[c3].cardBack])
              let pokeNumSet = new Set([theseCards[c1].cardPmonCount, theseCards[c2].cardPmonCount, theseCards[c3].cardPmonCount])
              let spriteSet = new Set([theseCards[c1].cardPmonImgUrl, theseCards[c2].cardPmonImgUrl, theseCards[c3].cardPmonImgUrl])
              if(borderSet.size !== 2 && backgroundSet.size !== 2 && pokeNumSet.size !== 2 && spriteSet.size !== 2){
                  totalSetsOnBoard += 1
              }
          }//end c3
      }//end c2
  }//end c1
  return(totalSetsOnBoard)
}

// this takes in already found pokemon (in the event user searched partial)
// and wanted remainder random, and the number to find.
export function getRandomPmon(pmonFound:string[]):string[]{

  const numToFind = maxPmonNeeded - pmonFound.length
  
  for(let thisPmon = 1; thisPmon <= numToFind; thisPmon++){
      let randomPmon = allPokemonList[Math.floor(Math.random()*385)]
      while (pmonFound.includes(randomPmon)){
          randomPmon = allPokemonList[Math.floor(Math.random()*385)]
      }
      pmonFound.push(randomPmon)
  }
  return(pmonFound)
}