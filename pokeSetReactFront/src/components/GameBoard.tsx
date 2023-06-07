import { useState } from "react"
import CardSlot from "./CardSlot"


type Card = {
    cardId:number
    cardBack:number
    cardBorder:number
    cardPmonCount:number
    cardPmonImgUrl:number
}

export default function GameBoard({imgUrls}) {
    
    // originally I had the cardPmonImgUrl set to imgUrls[0] and so on, but for
    // some reason I can't figure out those don't get passed through on re-render.
    // They're all fine here, but when we go to call cardslot with each card,
    // the urls don't make it through, and turn in to undefined. couldn't figure
    // that out, so trying a workaround.
    const[boardCards, setBoardCards] = useState<Card[]>([
        {cardId:0, cardBack:0, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:2},
        {cardId:1, cardBack:0, cardBorder:0, cardPmonCount:3, cardPmonImgUrl:2},
        {cardId:2, cardBack:0, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:2},
        {cardId:3, cardBack:0, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:0},
        {cardId:4, cardBack:1, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:0},
        {cardId:5, cardBack:1, cardBorder:1, cardPmonCount:1, cardPmonImgUrl:0},
        {cardId:6, cardBack:1, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:0},
        {cardId:7, cardBack:1, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:1},
        {cardId:8, cardBack:2, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:1},
        {cardId:9, cardBack:2, cardBorder:2, cardPmonCount:2, cardPmonImgUrl:1},
        {cardId:10, cardBack:2, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:1},
        {cardId:11, cardBack:2, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:2}
    ])


    return (
    <div className="gameBoardContainer">
        { boardCards.map(eachCard => (
            <CardSlot key={eachCard.cardId} eachCard={eachCard} imgUrls={imgUrls}/>
        ))}
    </div>
    )
}
