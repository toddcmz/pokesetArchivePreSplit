import { useRef, useState } from "react"
import GameBoard from "./GameBoard"
import allPokemonList from "../utils/allPokemonList.json"

export default function ChoosePokemon() {

    const [pmonImages, setPmonImages] = useState<string[]>([])

    // boolean state for conditional rendering: choose pokemon or gameboard stuff
    const [isPlaying, setIsPlaying] = useState<Boolean>(false)
    const [pmonNameList, setPmonNameList] = useState<string[]>([])

    const pmon1Field = useRef<HTMLInputElement>(null)
    const pmon2Field = useRef<HTMLInputElement>(null)
    const pmon3Field = useRef<HTMLInputElement>(null)

    async function handleChoosePokemonForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        // to lower is required for cases of correct spelling but incorrect casing
        // for the api, which requires all lower case to work. this will allow user
        // to type whatever casing they want.
        const pmon1Name = pmon1Field.current?.value.toLowerCase()
        const pmon2Name = pmon2Field.current?.value.toLowerCase()
        const pmon3Name = pmon3Field.current?.value.toLowerCase()

        // to pass to game board to display who you're playing with
        if(pmon1Name && pmon2Name && pmon3Name){
            const tempPmonNameList = [pmon1Name, pmon2Name, pmon3Name]
            setPmonNameList(tempPmonNameList)
        }

        const pokeList:string[] = allPokemonList

        // check for duplicated entries and disallow
        if(pmon1Name === pmon2Name || pmon1Name === pmon3Name || pmon2Name === pmon3Name){
            console.log("duplicate pokemon requested, cancelling catch em")
            return
        }
        // check for undefined (unentered fields and disallow) - this is required
        // to come first for the next check, valid entries, to work.
        if(!pmon1Name || !pmon2Name || !pmon3Name){
            console.log("field left blank, cannot submit form")
            return
        }
        // check all entries are valid requests and disallow if not
        if(!pokeList.includes(pmon1Name) || !pokeList.includes(pmon2Name) || !pokeList.includes(pmon3Name)){
            console.log("one or more pokemon don't appear in our database")
            return
        }
        await retrieveSprites(pmon1Name, pmon2Name, pmon3Name)
    }

    async function handleSurpriseMeButton(){
        const pokeList:string[] = allPokemonList
        // math.floor(math.random() * max), where max is exclusive. so should go to 384.
        let num1 = Math.floor(Math.random() * (385))
        let num2 = num1
        while (num2 === num1){
            num2 = Math.floor(Math.random() * (385))
        }
        let num3 = num1
        while (num3 === num1 || num3 === num2){
            num3 = Math.floor(Math.random() * (385))
        }

        const pmon1Name = pokeList[num1]
        const pmon2Name = pokeList[num2]
        const pmon3Name = pokeList[num3]

        // to pass to game board to display who you're playing with
        if(pmon1Name && pmon2Name && pmon3Name){
            const tempPmonNameList = [pmon1Name, pmon2Name, pmon3Name]
            setPmonNameList(tempPmonNameList)
        }

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
            <div className="selectorDirectionsContainer"> 
                <h3>Choose Pokemon</h3>
                <h5>Warning: choose pkmn validation not yet implemented. Pkmn through emerald gen are available.</h5>
                <h5>Refresh page and choose new pkmn if not all cards display a sprite.</h5>
            </div>
            <div className="pokemonSelectorsContainer">
            <form onSubmit={handleChoosePokemonForm}>
                <input type="text" placeholder="Pokemon 1" ref={pmon1Field}/>
                <input type="text" placeholder="Pokemon 2" ref={pmon2Field}/>
                <input type="text" placeholder="Pokemon 3" ref={pmon3Field}/>
                <button className="pmonSelectorButtons allAppButtons">Catch 'em!</button>
            </form>
            <button className="pmonSelectorButtons allAppButtons" onClick={handleSurpriseMeButton}>Surprise Me</button>
            </div>
        </>
        }
        {isPlaying &&
            <GameBoard imgUrls={pmonImages} setIsPlaying={setIsPlaying} pmonNameList={pmonNameList} />
        }
    </>
  )
}
