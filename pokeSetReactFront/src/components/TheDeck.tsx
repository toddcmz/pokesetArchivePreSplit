
export default function MakeDeck(){

    const theDeck = []
    let thisCardId = 0

    // soooo... uh... how *should* I go about making the deck?
    // I mean, I *could* just hard code 81 cards...
    // This approach should result in all the permutations
    // of three values four times...3^4.
    //...actually, it occurs to me long after the fact that I don't actually
    // have to have a deck. I could just randomly generate the four integer
    // values every time a new card is created for the board. I'd have to playtest
    // how well this works in practice, this method with the deck ensures a certain 
    // likelihood of having a set in 12 cards, but doing away with the deck entirely woudl
    // simplify the app. Probably the right choice in the long run, not implementing that now.
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