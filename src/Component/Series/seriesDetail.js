import React, { useEffect, useState } from "react";
import axios from 'axios';
import md5 from 'md5';
import { useParams, useNavigate } from "react-router-dom";

export default function SeriesDetail(props) {
    const [seriesDetail, setSeriesDetail] = useState({})
    const [relatedCharacter, setRelatedCharacter] = useState([])
    const [seriesLink, setSeriesLink] = useState('')
    const [characterCurrentPage, setCharacterCurrentPage] = useState(1)
    const [characterTotalPage, setCharacterToltalPage] = useState(0)
    const [characterTotalResult, setcharacterTotalResult] = useState(0)

    const navigate = useNavigate()

    const params = useParams()

    const getseriesDetail = async () => {
        try {
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const characterList = await axios(`https://gateway.marvel.com/v1/public/series/${params.seriesId}?ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}`)

            if (characterList.data && characterList.data.status === 'Ok') {
                if (characterList.data.data && characterList.data.data.results) {
                    if (characterList.data.data.count >= 1) {
                        const result = characterList.data.data.results[0]
                        const findCharacterLink = result.urls.find((item) => item.type === 'detail')
                        if (findCharacterLink) {
                            setSeriesLink(findCharacterLink.url)
                        }
                        setSeriesDetail(result)
                    }
                }
            }

        } catch (error) {
            console.log('get character detail error: ', error)
        }
    }

    const getrelatedCharacter = async (page) => {
        try {
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const characterList = await axios(`https://gateway.marvel.com/v1/public/series/${params.seriesId}/characters?ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}&offset=${page}`)

            if (characterList.data && characterList.data.status === 'Ok') {
                if (characterList.data.data && characterList.data.data.results) {
                    if (characterList.data.data.count >= 1) {
                        const totalItem = characterList.data.data.total
                        const totalPg = Math.ceil(totalItem / 20)
                        setCharacterToltalPage(totalPg)
                        setcharacterTotalResult(totalItem)
                        setCharacterCurrentPage(page)
                        setRelatedCharacter(characterList.data.data.results)
                    }
                }
            }

        } catch (error) {
            console.log('get related series error: ', error)
        }
    }

    useEffect(() => {
        getseriesDetail()
        getrelatedCharacter(1)
    }, [])

    return (
        <div style={{ padding: '40px' }}>
            <div>
                <span style={{fontSize: '1.2em', fontWeight: 600}}><a href="/">Home</a> / <a href="/series">Series</a> / <a>Detail</a></span>
            </div>
            <hr />
            <div>
                <div>
                    <h1>{seriesDetail.title}</h1>
                    <h6>MARVEL SERIES INFORMATION</h6>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <img src={seriesDetail.thumbnail && seriesDetail.thumbnail.path ? seriesDetail.thumbnail.path + `/landscape_xlarge.${seriesDetail.thumbnail.extension}` : ''} style={{ height: '100%', maxWidth: '100%' }}></img>
                </div>
                <div className="col-sm-12 col-md-8">
                    <h2>GENERAL INFORMATION</h2>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>ID</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{seriesDetail.id}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>TITLE</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{seriesDetail.title}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>DESCRIPTION</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <p>{seriesDetail.description}</p>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-md-3">
                            <b>SERIES DETAIL</b>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <a href={seriesLink ? seriesLink : ''}>{seriesLink.length ? 'Click here to redirect Marvel.com' : ''}</a>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <h2 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>RELATED SERIES</h2>

            <div className="row" style={{ marginLeft: '0', marginRight: 0, justifyContent: 'center' }}>

                {relatedCharacter.map((characterItem) => {
                    return (
                        <div className="card" style={{ width: '300px', marginLeft: '30px', marginBottom: '30px' }}>
                            <img className="card-img-top" src={characterItem.thumbnail && characterItem.thumbnail.path ? characterItem.thumbnail.path + `/landscape_xlarge.${characterItem.thumbnail.extension}` : ''} alt="Card image" style={{ width: '100%' }} />
                            <div className="card-body" style={{ position: 'relative', paddingBottom: '60px' }}>
                                <h4 className="card-title">Name: <b>{characterItem.name}</b></h4>
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

            {relatedCharacter.length > 20 ?
                <div className="d-flex flex-row justify-content-center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <ul class="pagination">
                        <li class={`page-item ${characterCurrentPage <= 1 ? 'disabled' : ''}`}
                            onClick={() => {
                                getrelatedCharacter(characterCurrentPage - 1)
                            }}
                        >
                            <a class="page-link" >Previous</a>
                        </li>

                        <li class="page-item"><a class="page-link" >{characterCurrentPage} - {characterTotalPage}</a></li>

                        <li class={`page-item ${characterCurrentPage >= characterTotalPage ? 'disabled' : ''}`}
                            onClick={() => {
                                getrelatedCharacter(characterCurrentPage + 1)
                            }}
                        >
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </div> : <div style={{ marginBottom: '200px' }}></div>
            }

        </div>
    )
}