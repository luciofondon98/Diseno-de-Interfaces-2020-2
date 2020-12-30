import React, { Component } from 'react';
import { Check, X } from 'react-bootstrap-icons'
import TinderCard from "react-tinder-card";
import "./NewsCards.css";


class NewsCards extends Component{

    constructor(props){
        super(props);
        this.state = {
            noticias: [
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
        }
    }
    
    render(){
        
        const {noticias} = this.state

        return(
        <div className= "tinderCards_cardContainer">
            {noticias.map((noticia)=>{
                return ( 
                    <TinderCard className="swipe" key={noticia.title} preventSwipe={["up","down"]}> 
                    <div className="card" style={{width: '30rem', textAlign: 'center',height: '35rem'}}>
                        <img className="card-img-top" src={noticia.photo} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">{noticia.title}</h5>
                            <p className="card-text">{noticia.body}</p>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="card-body">
                            <Check style={{width: "40%", float: "right", height: '70px', color: 'green'}} ></Check>
                            <X style={{width: "40%", float: "left", height: '70px', color: 'red'}} ></X>
                        </div>
                    </div>
                    </TinderCard>    
                )
            }
        )}
        </div>
        );
    }
};

export default NewsCards;