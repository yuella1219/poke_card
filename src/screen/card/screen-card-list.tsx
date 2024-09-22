import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {CardFront} from './components/card-front.tsx'
import {CardSkeleton} from './components/card-skeleton.tsx'

const API_KEY = 'https://pokeapi.co/api/v2/pokemon/'

export const ScreenCardList = () => {
    const [pokeData, setPokeData] = useState([]);
    const [korean, setKorean] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prevArr, setPrevArr] = useState([]);
    const [nextArr, setNextArr] = useState([]);

    const handlePokeApi = async () => {
        await axios.get(API_KEY).then(response => {
            setPrevArr(response.data.previous)
            setNextArr(response.data.next)
            setTimeout(()=>{
                setLoading(false)
            }, 500)
            setPokeData(response.data.results)
        })
        .catch(error => console.error('Timeout error:', error));
    }

    useEffect(()=>{
        // if(loading) handlePokeApi()
        handlePokeApi()
    }, [])
    const SKELETON_COUNT = 20;
    return (
        <>
        <h1>포켓몬 도감 만들기</h1>
        <ul className="card-list">
            {loading ? 
                Array.from({length:SKELETON_COUNT}).map((_, index)=>(
                    <CardSkeleton key={index}/>
                )) : 
                pokeData.map((item, index)=>{
                    return <CardFront key={index} data={item}/>
                })
            }
        </ul>
            <button className="btn-next">다음</button>
        </>
    );
};
