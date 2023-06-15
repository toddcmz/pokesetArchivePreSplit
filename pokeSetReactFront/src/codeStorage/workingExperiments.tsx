// This code block was used to try to print out all three pokemon sprites
// upon successful API fetch during testing, originally in ChoosePokemon

{/* <ul>
    <img className="pmonSprite" src={`${pmonImages[0]}`} alt='poke1 icon'/>
    <br />
    <img className="pmonSprite" src={`${pmonImages[1]}`} alt='poke2 icon'/>
    <br />
    <img className="pmonSprite" src={`${pmonImages[2]}`} alt='poke3 icon'/>
    {pmonImages.map((theseImages)=>(
        <li>
            <img className="pmonSprite" src={`${theseImages}`} alt='a poke icon'/>
        </li>
    ))}
</ul> */}

// This code block was used to show proof of concept for all possible traits
// of set cards, ending up with background color, border, pokemon type,
// and number of pokemon. Originally was in ChoosePokemon.

{/* <div className="flexMeRow demoAllCardsContainer">
    <div className="outerCard">
    <div className="setCard cardBack0 cardBorder0 flexMeColumn">
        <img className="pmonSprite" src={`${pmonImages[0]}`} alt="" />
    </div>
    </div>
    <div className="setCard cardBack1 cardBorder1 flexMeColumn">
        <img className="pmonSprite" src={`${pmonImages[1]}`} alt="" />
        <img className="pmonSprite" src={`${pmonImages[1]}`} alt="" />
    </div>
    <div className="setCard cardBack2 cardBorder2 flexMeColumn">
        <img className="pmonSprite" src={`${pmonImages[2]}`} alt="" />
        <img className="pmonSprite" src={`${pmonImages[2]}`} alt="" />
        <img className="pmonSprite" src={`${pmonImages[2]}`} alt="" />
    </div>
</div> */}

// Original verbose form of the handle click function, prior to useEffect

// function handleClick(selectedCard:Card):void{
//     console.log('initial call',userSelections)
//     if (userSelections.length === 0 || userSelections.length === 1){
//         setUserSelections(userSelections => [...userSelections, selectedCard])
//         userSelections.length === 0? setUserTimesClicked('1 card clicked') : setUserTimesClicked('2 cards clicked')
//         setFoundSetStatus('Player is choosing cards...')
//         //okay, interestingly, this console log spits out an empty array on first click,
//         // because of the order in which things render/happen. this is why I couldn't 
//         // yet access userSelections[2] in the else statement below.
//         console.log('within if statement',userSelections)
//         return
//     }else{
//         // here, there are two cards already selected, add the third and check
//         // if the user selected a set
//         //setUserSelections(userSelections => [...userSelections, selectedCard])
//         // do set checks with the new Set functionality.
//         // for each trait, all cards must have all the same characteristic
//         // or all different characteristics. A set() (javascript set) of
//         // three characteristics will be length 1 if all the same, or length
//         // three if all different.
//         // at this stage, userSelections I thought would have 3 elements, but that's
//         // misunderstanding the timing of how objects change in react with state. Instead, I just
//         // have the first two cards. That's okay, because I have the third card in selectedCard, so I'll
//         // just use that instead.
        
//         let borderSet = [...new Set([userSelections[0].cardBorder, userSelections[1].cardBorder, selectedCard.cardBorder])]
//         let backgroundSet = [...new Set([userSelections[0].cardBack, userSelections[1].cardBack, selectedCard.cardBack])]
//         let pokeNumSet = [...new Set([userSelections[0].cardPmonCount, userSelections[1].cardPmonCount, selectedCard.cardPmonCount])]
//         let spriteSet = [...new Set([userSelections[0].cardPmonImgUrl, userSelections[1].cardPmonImgUrl, selectedCard.cardPmonImgUrl])]
//         console.log('border:', borderSet)
//         console.log('back:', backgroundSet)
//         console.log('num:', pokeNumSet)
//         console.log('sprite:', spriteSet)
//         console.log('id1:',userSelections[0].cardId, 'id2:',userSelections[1].cardId, 'id3:',selectedCard.cardId)
//         // do the comparisons to determine valid set based on above 4 objects lengths, just none of them can be of length 2.
//         if(borderSet.length !== 2 && backgroundSet.length !== 2 && pokeNumSet.length !== 2 && spriteSet.length !== 2){
//             setFoundSetStatus("Yay! That's a valid set!")
//             setSetsFound(setsFound + 1)

//         }else{
//             setFoundSetStatus("Sorry, that's not a set. Try again.")
//         }
//         // restore userSelections state to an empty array. I think there may be a timing issue on this as well...
//         setUserTimesClicked('No cards selected')
//         setUserSelections([])
//     }
// }

// randomization tack on for card arrays
// .sort(()=> Math.random() - 0.5)


// originally I had the cardPmonImgUrl set to imgUrls[0] and so on, but for
    // some reason I can't figure out those don't get passed through on re-render.
    // They're all fine here, but when we go to call cardslot with each card,
    // the urls don't make it through, and turn in to undefined. couldn't figure
    // that out, so trying a workaround.
    // the .sort Math.random() is from the memory game video tutorial I watched.
    // what is the -0.5 doing there?
// testing cards array
// {cardId:0, cardBack:0, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:2},
//         {cardId:1, cardBack:0, cardBorder:0, cardPmonCount:3, cardPmonImgUrl:2},
//         {cardId:2, cardBack:0, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:2},
//         {cardId:3, cardBack:0, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:0},
//         {cardId:4, cardBack:1, cardBorder:0, cardPmonCount:1, cardPmonImgUrl:0},
//         {cardId:5, cardBack:1, cardBorder:1, cardPmonCount:1, cardPmonImgUrl:0},
//         {cardId:6, cardBack:1, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:0},
//         {cardId:7, cardBack:1, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:1},
//         {cardId:8, cardBack:2, cardBorder:1, cardPmonCount:2, cardPmonImgUrl:1},
//         {cardId:9, cardBack:2, cardBorder:2, cardPmonCount:2, cardPmonImgUrl:1},
//         {cardId:10, cardBack:2, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:1},
//         {cardId:11, cardBack:2, cardBorder:2, cardPmonCount:3, cardPmonImgUrl:2}

// throwaway comment for pull request etsting