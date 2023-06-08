import { useEffect, useState } from "react"
import CardSlot from "./CardSlot"
import MakeDeck from './TheDeck'

export type Card = {
    cardId:number
    cardBack:number
    cardBorder:number
    cardPmonCount:number
    cardPmonImgUrl:number
}

export default function GameBoard({imgUrls}:{imgUrls:string[]}) {

    // use state to show status of selections, maybe?
    const [foundSetStatus, setFoundSetStatus] = useState<string>('Awaiting game start')

    // this will hold the cards the user clicks on while playing
    const [userSelections, setUserSelections] = useState<Card[]>([])

    // this will help the user keep track of where they are in set choosing, probably
    // a temporary way of handling this for now
    const [userTimesClicked, setUserTimesClicked] = useState<string>("Cards clicked: 0")

    //keep track of total sets found this game
    const [setsFound, setSetsFound] = useState(0)

    // make the original game deck, this is constructed in TheDeck component
    const[deckCards, setDeckCards] = useState<Card[]>(MakeDeck())

    // make the initial game board, first 12 cards of the game deck.
    // what I want is to remove those cards from the deck, preferrably
    // the final 12 cards, actually, but react documentation is telling me not to mutate
    // things like that. Maybe I can figure out how to use some sort of
    // "where in the deck are we" pointer? I suppose I could just pull a random
    // card for now. It would be nice to figure out the pointer, though.
    const[boardCards, setBoardCards] = useState<Card[]>(deckCards.slice(0,12))

    // so, let's try the pointer method for the deck to figure out where we are.
    // we could add logic down the line to generate a new deck and a new board
    // if we reach the end of the deck, probably within the useEffect. Starts
    // at twelve out of the gate, the index of the next card in the shuffled
    // starting deck to deal out.
    const[deckPointer, setDeckPointer] = useState(12)

    //useEffect to trigger updates to the top 4 states listed above when
    // the userSelections state array has 3 cards in it. if it has 0
    // or 1 card in it, we just update the status states associated with
    // giving the user info about what's going on in the game. If length
    // is 3, then we're going to run our set checks and update things
    // accordingly.
    useEffect(()=>{
        // this is the "check if a set case"
        if(userSelections.length === 3){
            let borderSet = [...new Set([userSelections[0].cardBorder, userSelections[1].cardBorder, userSelections[2].cardBorder])]
            let backgroundSet = [...new Set([userSelections[0].cardBack, userSelections[1].cardBack, userSelections[2].cardBack])]
            let pokeNumSet = [...new Set([userSelections[0].cardPmonCount, userSelections[1].cardPmonCount, userSelections[2].cardPmonCount])]
            let spriteSet = [...new Set([userSelections[0].cardPmonImgUrl, userSelections[1].cardPmonImgUrl, userSelections[2].cardPmonImgUrl])]
            // do the comparisons to determine valid set based on above 4 objects lengths, just none of them can be of length 2.
            if(borderSet.length !== 2 && backgroundSet.length !== 2 && pokeNumSet.length !== 2 && spriteSet.length !== 2){
                setFoundSetStatus("Yay! That's a valid set!")
                setSetsFound(setsFound + 1)
                setUserSelections([])
                setUserTimesClicked("Cards clicked: 0")
                // can I add code here to filter the board by the card IDs that were a set?
                // let's try that to show removal from board...
                setBoardCards((boardCards) => boardCards.filter(
                    (card)=> card.cardId !== userSelections[0].cardId 
                    && 
                    card.cardId !== userSelections[1].cardId 
                    && 
                    card.cardId !== userSelections[2].cardId
                    )
                )
                // okay, that filters out a found set just fine...can I add more cards to 
                // board cards? sadly it does rearrange the board, which I don't want, but
                // my gut is telling me that might end up being a bit of a thorny issue...

            // otherwise not a valid set
            }else{
                setFoundSetStatus("Sorry, that's not a set. Try again.")
                setUserSelections([])
                setUserTimesClicked("Cards clicked: 0")
            }
        // update message states if there's 2 cards in the array
        }else if(userSelections.length === 2 || userSelections.length === 1){
            setUserTimesClicked(`Cards clicked: ${userSelections.length}`)
            setFoundSetStatus('Player is choosing cards...')
        }
        // otherwise the array is empty and we do nothing.
    },[userSelections])

    // maybe I need a second useEffect that runs on board cards when they're removed?
    useEffect(()=>{
        if(boardCards.length === 9){
            setBoardCards([...boardCards, 
                            deckCards[deckPointer], 
                            deckCards[deckPointer+1],
                            deckCards[deckPointer+2]])
            //then update the deck pointer
            setDeckPointer(deckPointer + 3)
        }
    },[boardCards])

    // I could probably add a useEffect if this works to check the deck pointer and 
    // generate a newly shuffled deck. This could be useful.

    function handleClick(selectedCard:Card):void{
        setUserSelections(userSelections => [...userSelections, selectedCard])
    }

    return (
    <>
        <h3>{foundSetStatus}</h3>
        <h3>{userTimesClicked}</h3>
        <h3>Sets Found: {setsFound}</h3>
        <div className="gameBoardContainer">
            { boardCards.map(eachCard => (
                <CardSlot key={eachCard.cardId} eachCard={eachCard} imgUrls={imgUrls} handleClick={handleClick}/>
            ))}
        </div>
    </>
    )
}
