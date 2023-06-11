import { Card } from './GameBoard'

interface CardSlotProps {
  eachCard:Card
  imgUrls:string[]
  handleClick:(c:Card)=>void
}

export default function CardSlot({eachCard, imgUrls, handleClick}:CardSlotProps) {

  return (
    <div className="cardSlot">
        {/* Outer div is the whole card, with css styling provided through props from eachCard */}
        <div className={`setCard flexMeColumn 
                        cardBack${eachCard.cardBack} 
                        cardBorder${eachCard.cardBorder}`
                    }
                    onClick={()=> handleClick(eachCard)}    >
            {/* following logic determines the number of sprites that get rendered
            for that card. wanted urls to come in as part of the eachCard object,
            something about the timing over which everythign happens wasn't right
            Approach is just ot subset the already fetched URLS array by the position
            assigned to that card (0, 1, or 2) as determined during deck building */}
            {eachCard.cardPmonCount===1?
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            :
            eachCard.cardPmonCount===2?
            <>
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            </>
            :
            <>
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            <img src={`${imgUrls[eachCard.cardPmonImgUrl]}`} alt="" />
            </>
            }
        </div>
    
    </div>
  )
}
