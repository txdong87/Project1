import React, { useEffect, useState } from "react";
import axios from 'axios';
import md5 from 'md5';
import { useParams, useNavigate } from "react-router-dom";

export default function CharacterDetail(props) {
    const [characterDetail, setCharacterDetail] = useState({})
    const [relatedSeries, setRelatedSeries] = useState([])
    const [characterLink, setCharacterLink] = useState('')
    const [comicsLink, setComicsLink] = useState('')
    const [seriesCurrentPage, setSeriesCurrentPage] = useState(1)
    const [seriesTotalPage, setSeriesToltalPage] = useState(0)
    const [seriesTotalResult, setSeriesTotalResult] = useState(0)

    const navigate = useNavigate()

    const params = useParams()

    const getCharacterDetail = async () => {
        try {
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const characterList = await axios(`https://gateway.marvel.com/v1/public/characters/${params.characterId}?ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}`)

            if (characterList.data && characterList.data.status === 'Ok') {
                if (characterList.data.data && characterList.data.data.results) {
                    if (characterList.data.data.count >= 1) {
                        const result = characterList.data.data.results[0]
                        const findCharacterLink = result.urls.find((item) => item.type === 'detail')
                        const findComicsLink = result.urls.find((item) => item.type === 'comiclink')

                        if (findCharacterLink) {
                            setCharacterLink(findCharacterLink.url)
                        }
                        if (findComicsLink) {
                            setComicsLink(findComicsLink.url)
                        }
                        setCharacterDetail(result)
                    }
                }
            }

        } catch (error) {
            console.log('get character detail error: ', error)
        }
    }

    const getRelatedSeries = async (page) => {
        try {
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const characterList = await axios(`https://gateway.marvel.com/v1/public/characters/${params.characterId}/series?ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}&offset=${page}`)

            if (characterList.data && characterList.data.status === 'Ok') {
                if (characterList.data.data && characterList.data.data.results) {
                    if (characterList.data.data.count >= 1) {
                        const totalItem = characterList.data.data.total
                        const totalPg = Math.ceil(totalItem / 20)
                        setSeriesToltalPage(totalPg)
                        setSeriesTotalResult(totalItem)
                        setSeriesCurrentPage(page)
                        setRelatedSeries(characterList.data.data.results)
                    }
                }
            }

        } catch (error) {
            console.log('get related series error: ', error)
        }
    }

    useEffect(() => {
        getCharacterDetail()
        getRelatedSeries(1)
    }, [])

    return (
        <div style={{ padding: '40px' }}>
            <div>
                <span style={{fontSize: '1.2em', fontWeight: 600}}><a href="/">Home</a> / <a href="/character">Character</a> / <a>Detail</a></span>
            </div>
            <hr />
            <div>
                <h1>{characterDetail.name}</h1>
                <h6>MARVEL CHARACTER PROFILE</h6>
            </div>

            <hr />

            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <img src={characterDetail.thumbnail && characterDetail.thumbnail.path ? characterDetail.thumbnail.path + `/landscape_xlarge.${characterDetail.thumbnail.extension}` : ''} style={{ height: '100%', maxWidth: '100%'}}></img>
                </div>
                <div className="col-sm-12 col-md-8">
                    <h2>GENERAL INFORMATION</h2>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>ID</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{characterDetail.id}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>Name</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{characterDetail.name}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>Description</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{characterDetail.description}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>Character wiki</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <a href={characterLink ? characterLink : ''}>{characterLink.length ? 'Click here to redirect Marvel.com' : ''}</a>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>Related comics</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <a href={comicsLink ? comicsLink : ''}>{comicsLink.length ? 'Click here to redirect Marvel.com' : ''}</a>
                        </div>
                    </div>

                </div>
            </div>

            <hr />

            <h2 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>RELATED SERIES</h2>

            <div className="row" style={{ marginLeft: '0', marginRight: 0, justifyContent: 'center' }}>

                {relatedSeries.map((characterItem) => {
                    return (
                        <div className="card" style={{ width: '300px', marginLeft: '30px', marginBottom: '50px' }}>
                            <img className="card-img-top" src={characterItem.thumbnail && characterItem.thumbnail.path ? characterItem.thumbnail.path + `/landscape_xlarge.${characterItem.thumbnail.extension}` : ''} alt="Card image" style={{ width: '100%' }} />
                            <div className="card-body" style={{ position: 'relative', paddingBottom: '60px' }}>
                                <h4 className="card-title">TITLE: <b>{characterItem.title}</b></h4>
                                <hr />
                                <h5 className="card-title">ID: <b>{characterItem.id}</b></h5>
                                <hr />
                                <p className="card-text">{characterItem.description}</p>
                                <a style={{ position: 'absolute', bottom: '20px', left: '35%' }}
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/character/${characterItem.id}`)}
                                >Show Detail</a>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="d-flex flex-row justify-content-center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                <ul class="pagination">
                    <li class={`page-item ${seriesCurrentPage <= 1 ? 'disabled' : ''}`}
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            getRelatedSeries(seriesCurrentPage - 1)
                        }}
                    >
                        <a class="page-link" >Previous</a>
                    </li>

                    <li class="page-item"><a class="page-link" >{seriesCurrentPage} - {seriesTotalPage}</a></li>

                    <li class={`page-item ${seriesCurrentPage >= seriesTotalPage ? 'disabled' : ''}`}
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            getRelatedSeries(seriesCurrentPage + 1)
                        }}
                    >
                        <a class="page-link">Next</a>
                    </li>
                </ul>
            </div>

        </div>
    )
}