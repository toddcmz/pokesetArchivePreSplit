
import { useState } from "react"
import allPokemonList from "../utils/allPokemonList.json"

// this was for makign sure I can return all the sprites in the name list. could
// have been written in a smarter way.

type PmonTest = {
  pmonName:string
  pmonUrl:string
}

export default function SpriteRetrievalTesting() {

  const pmonNamesList:string[] = allPokemonList
  const [allSprites, setAllSprites] = useState<PmonTest[]>([])

  async function getAllSprites(){

    const tempAllSprites:PmonTest[] = []

    for (let i = 0; i < pmonNamesList.length; i++){

      let pmonToGet = pmonNamesList[i]

      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pmonToGet}`)
      if(res.ok){
        const data = await res.json()
        let imageUrl:string = data['sprites']['versions']['generation-iii']['emerald']['front_default']
        tempAllSprites.push({pmonName:pmonToGet, pmonUrl: imageUrl})
      }
    }
    setAllSprites(tempAllSprites)
  }

  // this works without an await but I'm not sure why.
  getAllSprites()

  return (
    <div>

      {allSprites.map(eachPmon => (
        <div className="spriteTest">
          <p>{eachPmon.pmonName}</p>
          <img className="pmonSprite" src={`${eachPmon.pmonUrl}`} alt="imgNotFound" />
        </div>
      ))}

    </div>
  )
}
