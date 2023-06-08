
export default function MakeDeck(){

    const theDeck = []
    let thisCardId = 0

    // soooo... uh... how *should* I go about making the deck?
    // I mean, I *could* just hard code 81 cards...
    // This approach SHOUlD result in all the permutations
    // of three values four times...3^4.
    for(let back=0; back<3; back++){
        for(let bord=0; bord<3; bord++){
            for(let count=1; count<4; count++){
                for(let url=0; url<3; url++){
                    let thisCard = {cardId: thisCardId,
                                    cardBack:back,
                                    cardBorder:bord,
                                    cardPmonCount:count,
                                    cardPmonImgUrl:url}
                    thisCardId +=1
                    theDeck.push(thisCard)
                }
            }
        }
    }
    return theDeck.sort(()=> Math.random() - 0.5)
}