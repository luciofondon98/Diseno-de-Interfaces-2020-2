import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import "./NewsCards.css";
import "./swipeButtons.css"
const db = [
  {
    photo: "https://www.infobae.com/new-resizer/-InegSd8asL0NEs-PBuEnt3vVco=/768x512/filters:format(jpg):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/FTSLZCGIRRDP7B6F7HD3TGD2CM.jpg",
    title: "COVID-19",
    body: "Vacunas llegan a Chile"
},
{
    photo: "https://cooperativa.cl/noticias/site/artic/20201227/imag/foto_0000001120201227214447.jpg",
    title: "Más 8.600 funcionarios de la salud ya fueron vacunados contra el Covid-19",
    body: "El 66 por ciento de las dosis de Pfizer ya aplicadas fueron ocupadas en hospitales y clínicas de la Región Metropolitana, y las restantes en el Biobío, La Araucanía y Magallanes."
}
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.title !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.title))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
      const index = db.map(person => person.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
      <div className='tinderCards_cardContainer'>
        {characters.map((noticia, index) =>
            <TinderCard ref={childRefs[index]} className='swipe' key={noticia.title} onSwipe={(dir) => swiped(dir, noticia.title)} onCardLeftScreen={() => outOfFrame(noticia.title)} key={noticia.title} preventSwipe={["up","down"]}> 
          <div className="card" style={{width: '30rem', textAlign: 'center',height: '35rem'}}>
                <img className="card-img-top" src={noticia.photo} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">{noticia.title}</h5>
                    <p className="card-text">{noticia.body}</p>
                </div>
                <br></br>
                <br></br>
            </div>
            </TinderCard>    
            
        )}
        <div className="card-body">
            <div className="swipeButtons">
                <IconButton onClick={() => swipe('left')} className="left">
                    <ClearIcon style={{width: "20%", height: '60px'}} ></ClearIcon>
                </IconButton>
                <IconButton onClick={() => swipe('right')} className="right">
                    <CheckIcon style={{width: "20%", height: '60px'}} ></CheckIcon>
                </IconButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Advanced;