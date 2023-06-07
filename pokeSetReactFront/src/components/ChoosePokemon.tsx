import { useRef, useState } from "react"
import GameBoard from "./GameBoard"


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
  return (
    <>
        <div> 
            <h3>Choose Pokemon</h3>
        </div>
        <form onSubmit={handleChoosePokemonForm}>
            <input type="text" placeholder="Pokemon 1" ref={pmon1Field}/>
            <br /><br />
            <input type="text" placeholder="Pokemon 2" ref={pmon2Field}/>
            <br /><br />
            <input type="text" placeholder="Pokemon 3" ref={pmon3Field}/>
            <br /><br />
            <button>Catch 'em!</button>
        </form>
        <GameBoard imgUrls={pmonImages}/>
    </>
  )
}
