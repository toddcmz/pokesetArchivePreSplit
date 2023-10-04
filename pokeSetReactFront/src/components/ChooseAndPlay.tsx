import { useRef, useState } from "react"

import GameBoard from "./GameBoard"
import allPokemonList from "../utils/allPokemonList.json"
import { getRandomPmon } from "../utils/generalFunctions"

export default function ChoosePokemon() {

    const [pmonImages, setPmonImages] = useState<string[]>([])

    // boolean state for conditional rendering: choose pokemon or gameboard stuff
    const [isPlaying, setIsPlaying] = useState<Boolean>(false)
    const [pmonNameList, setPmonNameList] = useState<string[]>([])
    const [inputErrorMessage, setInputErrorMessage] = useState("")

    const pmon1Field = useRef<HTMLInputElement>(null)
    const pmon2Field = useRef<HTMLInputElement>(null)
    const pmon3Field = useRef<HTMLInputElement>(null)

    async function handleChoosePokemonForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        // to lower is required for cases of correct spelling but incorrect casing
        // for the api, which requires all lower case to work. this will allow user
        // to type whatever casing they want.

        let pmon1Name = pmon1Field.current?.value.toLowerCase() || ""
        let pmon2Name = pmon2Field.current?.value.toLowerCase() || ""
        let pmon3Name = pmon3Field.current?.value.toLowerCase() || ""

        // check for duplicated entries and disallow - but only if not blanks
        // as duplicates
        if((pmon1Name !== "" && pmon1Name === pmon2Name) || 
           (pmon1Name !== "" && pmon1Name === pmon3Name) || 
           (pmon2Name !== "" && pmon2Name === pmon3Name)){
            setInputErrorMessage("Error: No duplicate entries allowed.")
            return
        }

        // replace blanks with random pokemon
        if(pmon1Name === "" || pmon2Name === "" || pmon3Name === ""){
            const tempPmonNames = [pmon1Name, pmon2Name, pmon3Name]
            const validNames = tempPmonNames.filter(pmon => pmon !== "")

            const randomNames = getRandomPmon(validNames)

            randomNames.forEach(ele => {validNames.push(ele)})

            pmon1Name = validNames[0]
            pmon2Name = validNames[1]
            pmon3Name = validNames[2]
        }

        // check all entries are valid requests and disallow if not
        if(!allPokemonList.includes(pmon1Name) || !allPokemonList.includes(pmon2Name) || !allPokemonList.includes(pmon3Name)){
            const inputPmon= [pmon1Name, pmon2Name, pmon3Name]
            const notFoundPmon = inputPmon.filter(pmon => !allPokemonList.includes(pmon))
            setInputErrorMessage(`Error: The following pokemon don't appear in our database: ${[...notFoundPmon].join(", ")}.`)
            return
        }

        // to pass to game board to display who you're playing with
        // at this point you should only ever have valid pmon. clear error message if there is one.
        setInputErrorMessage("")
        const tempPmonNameList = [pmon1Name, pmon2Name, pmon3Name]
        setPmonNameList(tempPmonNameList)
        await retrieveSprites(pmon1Name, pmon2Name, pmon3Name)
    }

    async function handleSurpriseMeButton(){
        
        // passes in pokemon we already have (none in this case),
        // which will make the function find 3 pokemon.
        const pmonList = getRandomPmon([])

        // to pass to game board to display who you're playing with
        setPmonNameList(pmonList)

        const pmon1Name = pmonList[0]
        const pmon2Name = pmonList[1]
        const pmon3Name = pmonList[2]
        // clear error message if there is one
        setInputErrorMessage("")
        await retrieveSprites(pmon1Name, pmon2Name, pmon3Name)
    }

    async function retrieveSprites(pmon1Name:string|undefined, pmon2Name:string|undefined, pmon3Name:string|undefined){

        setPmonImages([])

        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pmon1Name}`)
        const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pmon2Name}`)
        const res3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pmon3Name}`)

        if(res1.ok){
            const data = await res1.json()
            let imageSourceUrl1:string = data['sprites']['versions']['generation-iii']['emerald']['front_default']
            setPmonImages(pmonImages => [...pmonImages, imageSourceUrl1])
        }
        if(res2.ok){
            const data = await res2.json()
            let imageSourceUrl2:string = data['sprites']['versions']['generation-iii']['emerald']['front_default']
            setPmonImages(pmonImages => [...pmonImages, imageSourceUrl2])
        }
        if(res3.ok){
            const data = await res3.json()
            let imageSourceUrl3:string = data['sprites']['versions']['generation-iii']['emerald']['front_default']
            setPmonImages(pmonImages => [...pmonImages, imageSourceUrl3])
        }
        setIsPlaying(true)
    }

  return (
    <>
        {!isPlaying && 
        <>
            <div className="preGameContainer">
                <div className="selectorDirectionsContainer"> 
                    <h1>Play Pokeset</h1>
                    <button className="surpriseMeButton pmonSelectorButtons allAppButtons" onClick={handleSurpriseMeButton}>Surprise Me</button>
                    <h5> - Or - </h5>
                    <h2>Choose Pokemon</h2>
                </div>
                <div className="pokemonSelectorsContainer">
                <form className="pmonSelectorForm" onSubmit={handleChoosePokemonForm}>
                    <span>
                        <input className="pmonSelectorInputField" type="text" placeholder="Pokemon 1" ref={pmon1Field}/>
                    </span>
                    <span>
                        <input className="pmonSelectorInputField" type="text" placeholder="Pokemon 2" ref={pmon2Field}/>
                    </span>
                    <span>
                        <input className="pmonSelectorInputField" type="text" placeholder="Pokemon 3" ref={pmon3Field}/>
                    </span>
                    <span>
                        <button className="catchEmButton pmonSelectorButtons allAppButtons">Catch 'em!</button>
                        <p>Blanks catch a random pokemon.</p>
                    </span>
                </form>
                <h5 className= "errorMessage">{inputErrorMessage}</h5>
                </div>
            </div>
        </>
        }
        {isPlaying &&
            <GameBoard imgUrls={pmonImages} setIsPlaying={setIsPlaying} pmonNameList={pmonNameList} />
        }
    </>
  )
}
