import { useRef, useState } from "react"
import GameBoard from "./GameBoard"
import allPokemonList from "../utils/allPokemonList.json"

export default function ChoosePokemon() {

    const [pmonImages, setPmonImages] = useState<string[]>([])

    const pmon1Field = useRef<HTMLInputElement>(null)
    const pmon2Field = useRef<HTMLInputElement>(null)
    const pmon3Field = useRef<HTMLInputElement>(null)

    async function handleChoosePokemonForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const pmon1Name = pmon1Field.current?.value
        const pmon2Name = pmon2Field.current?.value
        const pmon3Name = pmon3Field.current?.value
        

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
    }

    async function handleSurpriseMeButton(){
        const pokeList:string[] = allPokemonList

        let num1 = Math.floor(Math.random() * (386 - 0))
        let num2 = num1
        while (num2 === num1){
            num2 = Math.floor(Math.random() * (386 - 0))
        }
        let num3 = num1
        while (num3 === num1 || num3 === num2){
            num3 = Math.floor(Math.random() * (386 - 0))
        }

        console.log(num1, num2, num3)
        console.log(pokeList[0])
    }

  return (
    <>

        <div> 
            <h3>Choose Pokemon</h3>
            <h5>Warning: choose pkmn validation not yet implemented. Pkmn through emerald gen are available.</h5>
            <h5>Refresh page and choose new pkmn if not all cards display a sprite.</h5>
        </div>
        <form onSubmit={handleChoosePokemonForm}>
            <input type="text" placeholder="Pokemon 1" ref={pmon1Field}/>
            <input type="text" placeholder="Pokemon 2" ref={pmon2Field}/>
            <input type="text" placeholder="Pokemon 3" ref={pmon3Field}/>
            <button>Catch 'em!</button>
        </form>
        <button onClick={handleSurpriseMeButton}>Surprise Me</button>
        <GameBoard imgUrls={pmonImages}/>
    </>
  )
}
