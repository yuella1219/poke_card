import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
    species :{
        name: string;
        url:string;
    }
    id : number;
    sprites:{
        front_default : string;
        back_default : string;
    }
}

interface KoreanData {
    name?: string;
    flavor_text?: string;
    type?: string;
    color?: string;
    koNm?: string;
  }

export const CardFront = ({data}) => {
    const [pokeData, setPokeData] = useState<Props | null>(null);
    const [speciesData, setSpeciesData] = useState('');
    const [koreanData, setKoreanData] = useState<KoreanData | null>()
    // const [koreanData, setKoreanData] = useState<KoreanData>()
    const [isLoading, setIsLoading] = useState(true);
    const [typeKO, setTypeKO] = useState('');

    const urlList = async () => {
        const url_key = data.url;
        await axios.get(url_key).then(response => {
            setPokeData(response.data);
            setTypeKO(response.data.types)
            // console.log(pokeData?.species)
            setSpeciesData(response.data.species.url)
            setIsLoading(false)
            console.log(typeKO)
        })
        .catch(error => console.error('error'))
    }

    const getKoreanData = async () =>{
        await axios.get(speciesData).then(response =>{
            const names = response.data.names.find((name) => name.language.name === 'ko');
            const flavor = response.data.flavor_text_entries.find((txt) => txt.language.name === 'ko');
            const types = response.data.egg_groups;
            const colors = response.data.color.name;
            if (names && flavor && types && colors) {
                setKoreanData({ name: names.name, flavor_text: flavor.flavor_text, type: types[0].name, color: colors, koNm:'' })
            }
            // getKoreanTypes();
            // console.log(response.data)
        })
        .catch(error => console.error('한국어 이름 에러'))
    }

    const getKoreanTypes = async () => {
        await axios.get(typeKO).then(response => {
            const types = response.data.types;
            
            const KoreanTypesExtract = types.map((idx)=>{
                const koNm = idx.names.find((nm) => nm.language.name === 'ko');
                return koNm ? koNm.name : idx.name;
            })
            // setKoreanData((prev) => [...prev, ...KoreanTypesExtract])
            console.log(koreanData)

        }).catch(error => console.log('error') )
    }

    useEffect(()=>{
        urlList();
    }, [data])

    useEffect(()=>{
        if(speciesData){
            getKoreanData();
        }
    }, [speciesData])

    return (
        <>
            {isLoading ? <p>Loading...</p> : 
                <li className="card">
                    <div>
                        <div className="species-info">
                            <p className="name">{koreanData?.name}</p>
                            <div className="number">
                                <p>{pokeData?.id}</p>
                            </div>
                        </div>
                        <div className="img-swiper">
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}     
                                loop={true}
                            >
                                <SwiperSlide>
                                    <img src={pokeData?.sprites.front_default} alt={`${koreanData?.name} 앞모습`}/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={pokeData?.sprites.back_default} alt={`${koreanData?.name} 뒷모습`}/>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="skill-info">
                            <p>{koreanData?.flavor_text}</p>
                        </div>
                    </div>
                </li>
            }
        </>
    );
};
