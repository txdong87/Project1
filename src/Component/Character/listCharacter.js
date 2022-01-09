import React, { useEffect, useState } from "react";
import axios from 'axios';
import md5 from 'md5';
import { useNavigate } from "react-router-dom";

export default function ListCharacter(props) {
    const [listCharacter, setListCharacter] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [orderBy, setOrderby] = useState('name')
    const [searchData, setSearchData] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getCharacter = async (order, search, page) => {
        try {
            setLoading(true)
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const characterList = await axios(`https://gateway.marvel.com/v1/public/characters?${search.length ? `nameStartsWith=${search.trim()}&` : ''}limit=20&offset=${page-1}&orderBy=${order}&ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}`)

            if (characterList.data && characterList.data.status === 'Ok') {
                if (characterList.data.data && characterList.data.data.results) {
                    if (characterList.data.data.count >= 1) {
                        const totalItem = characterList.data.data.total
                        const totalPg = Math.ceil(totalItem / 20)
                        setTotalPage(totalPg)
                        setTotalResult(totalItem)
                        setListCharacter(characterList.data.data.results)
                    } else {
                        setListCharacter([])
                        setTotalPage(0)
                        setTotalResult(0)
                    }
                } else {
                    setListCharacter([])
                    setTotalPage(0)
                    setTotalResult(0)
                }
            } else {
                setListCharacter([])
                setTotalPage(0)
                setTotalResult(0)
            }
            setCurrentPage(page)
            setLoading(false)

        } catch (error) {
            console.log('get character error: ', error)
        }
    }

    useEffect(() => {
        getCharacter('name', '', 1)
    }, [])

    return (
        <div>
            <div style={{ marginTop: '20px', paddingLeft: '50px', paddingRight: '50px' }}>
                <div>
                    <span style={{ fontSize: '1.2em', fontWeight: 600 }}><a href="/">Home</a> / <a>Character</a></span>
                </div>
                <hr />
                <h3 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>Marvel Character List</h3>
                {/** */}
                <div className="row" style={{ marginLeft: '0', marginRight: 0, marginBottom: '30px' }}>
                    <div className="col-md-5 col-sm-12" >
                        <div className="d-flex">
                            <div class="form-group" style={{ width: '80%' }}>
                                <input type="text" class="form-control" id="usr" value={searchData} onChange={(event) => setSearchData(event.target.value)} />
                            </div>
                            <div style={{ width: '20%' }}>
                                <button type="button"
                                    class="btn btn-primary"
                                    onClick={() => {
                                        getCharacter(orderBy, searchData, 1)
                                    }}
                                >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-8">
                        <div class="form-group">
                            <select class="form-control"
                                id="sel1"
                                value={orderBy}
                                onChange={(event) => {
                                    getCharacter(event.target.value, searchData, 1)
                                    setOrderby(event.target.value)
                                }}
                            >
                                <option value={'name'}>NAME ASC</option>
                                <option value={'-name'}>NAME DES</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <button type="button" class="btn btn-danger" onClick={() => {
                            getCharacter('name', '', 1)
                            setSearchData('')
                            setOrderby('name')
                        }}>Clear Filter</button>
                    </div>
                </div>

                <div className="row" style={{ marginLeft: '0', marginRight: 0, marginBottom: '30px' }}>
                    <h3 style={{ marginLeft: '15px' }}>SHOWING {totalResult > 0 ? ((currentPage - 1) * 20) + 1 : 0} - {totalResult > 20 ? currentPage * 20 : totalResult} OF {totalResult} RESULTS</h3>
                </div>
                {!loading ?
                    <div className="row" style={{ marginLeft: '0', marginRight: 0 }}>

                        {listCharacter.map((characterItem) => {
                            return (
                                <div className="card" style={{ width: '400px', marginLeft: '30px', marginBottom: '30px' }}>
                                    <img className="card-img-top" src={characterItem.thumbnail && characterItem.thumbnail.path ? characterItem.thumbnail.path + `/landscape_xlarge.${characterItem.thumbnail.extension}` : ''} alt="Card image" style={{ width: '100%' }} />
                                    <div className="card-body" style={{ position: 'relative', paddingBottom: '60px' }}>
                                        <h3 className="card-title">Name: <b>{characterItem.name}</b></h3>
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
                    </div> :
                    <div className="d-flex flex-row justify-content-center">
                        <div>
                            <div class="spinner-grow text-muted"></div>
                            <div class="spinner-grow text-primary"></div>
                            <div class="spinner-grow text-success"></div>
                        </div>
                    </div>
                }

                <div className="d-flex flex-row justify-content-center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <ul class="pagination">
                        <li class={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}
                            onClick={() => {
                                getCharacter(orderBy, searchData, currentPage - 1)
                            }}
                        >
                            <a class="page-link" >Previous</a>
                        </li>

                        <li class="page-item"><a class="page-link" >{currentPage} - {totalPage}</a></li>

                        <li class={`page-item ${currentPage >= totalPage ? 'disabled' : ''}`}
                            onClick={() => {
                                getCharacter(orderBy, searchData, currentPage + 1)
                            }}
                        >
                            <a class="page-link" >Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}