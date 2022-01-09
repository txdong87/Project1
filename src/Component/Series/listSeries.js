import React, { useEffect, useState } from "react";
import axios from 'axios';
import md5 from 'md5';
import { useNavigate } from "react-router-dom";

export default function ListSeries(props) {
    const [listSeries, setlistSeries] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [orderBy, setOrderby] = useState('title')
    const [searchData, setSearchData] = useState('')
    const [startYear, setStartYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getSeries = async (order, search, page, year) => {
        try {
            setLoading(true)
            const timstap = new Date().getTime().toString()
            const md5Str = md5(timstap + window.PRIVATE_KEY + window.PUBLIC_KEY).toString()
            const seriesList = await axios(`https://gateway.marvel.com/v1/public/series?${search.length ? `titleStartsWith=${search.trim()}&` : ''}${Number(year) > 0 ? `startYear=${year}&` : ''}limit=20&offset=${page-1}&orderBy=${order}&ts=${timstap}&apikey=${window.PUBLIC_KEY}&hash=${md5Str}`)

            if (seriesList.data && seriesList.data.status === 'Ok') {
                if (seriesList.data.data && seriesList.data.data.results) {
                    if (seriesList.data.data.count >= 1) {
                        const totalItem = seriesList.data.data.total
                        const totalPg = Math.ceil(totalItem / 20)
                        setTotalPage(totalPg)
                        setTotalResult(totalItem)
                        setlistSeries(seriesList.data.data.results)
                    } else {
                        setlistSeries([])
                        setTotalPage(0)
                        setTotalResult(0)
                    }
                } else {
                    setlistSeries([])
                    setTotalPage(0)
                    setTotalResult(0)
                }
            } else {
                setlistSeries([])
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
        getSeries('title', '', 1, 0)
    }, [])

    return (
        <div>
            <div style={{ marginTop: '20px', paddingLeft: '50px', paddingRight: '50px' }}>
                <div>
                    <span style={{ fontSize: '1.2em', fontWeight: 600 }}><a href="/">Home</a> / <a>Series</a></span>
                </div>
                <hr />

                <h3 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>Marvel Series List</h3>
                {/** */}
                <div className="row" style={{ marginLeft: '0', marginRight: 0, marginBottom: '30px' }}>
                    <div className="col-md-6 col-sm-12" >
                        <div className="d-flex">
                            <div class="form-group" style={{ width: '60%' }}>
                                <input type="text" class="form-control" id="usr" placeholder="Search by title" value={searchData} onChange={(event) => setSearchData(event.target.value)} />
                            </div>
                            <div class="form-group" style={{ width: '20%' }}>
                                <input type="text" class="form-control" id="usr" placeholder="Start year" value={startYear} onChange={(event) => setStartYear(event.target.value)} />
                            </div>
                            <div style={{ width: '20%' }}>
                                <button type="button"
                                    class="btn btn-primary"
                                    onClick={() => {
                                        getSeries(orderBy, searchData, 1, startYear)
                                    }}
                                >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-8">
                        <div class="form-group">
                            <select class="form-control"
                                id="sel1"
                                value={orderBy}
                                onChange={(event) => {
                                    getSeries(event.target.value, searchData, 1, startYear)
                                    setOrderby(event.target.value)
                                }}
                            >
                                <option value={'title'}>TITLE ASC</option>
                                <option value={'-title'}>TITLE DES</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <button type="button" class="btn btn-danger" onClick={() => {
                            getSeries('title', '', 1, '')
                            setSearchData('')
                            setCurrentPage(1)
                            setOrderby('title')
                            setStartYear('')
                        }}>Clear Filter</button>
                    </div>
                </div>

                <div className="row" style={{ marginLeft: '0', marginRight: 0, marginBottom: '30px' }}>
                    <h3 style={{ marginLeft: '15px' }}>SHOWING {totalResult > 0 ? ((currentPage - 1) * 20) + 1 : 0} - {totalResult > 20 ? currentPage * 20 : totalResult} OF {totalResult} RESULTS</h3>
                </div>
                {!loading ?
                    <div className="row" style={{ marginLeft: '0', marginRight: 0 }}>

                        {listSeries.map((characterItem) => {
                            return (
                                <div className="card" style={{ width: '400px', marginLeft: '30px', marginBottom: '30px' }}>
                                    <img className="card-img-top" src={characterItem.thumbnail && characterItem.thumbnail.path ? characterItem.thumbnail.path + `/landscape_xlarge.${characterItem.thumbnail.extension}` : ''} alt="Card image" style={{ width: '100%' }} />
                                    <div className="card-body" style={{ position: 'relative', paddingBottom: '60px' }}>
                                        <h3 className="card-title">TITLE: <b>{characterItem.title}</b></h3>
                                        <hr />
                                        <h5 className="card-title">ID: <b>{characterItem.id}</b></h5>
                                        <hr />
                                        <p className="card-text">{characterItem.description}</p>
                                        <a style={{ position: 'absolute', bottom: '20px', left: '35%' }}
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/series/${characterItem.id}`)}
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
                                getSeries(orderBy, searchData, currentPage - 1, startYear)
                            }}
                        >
                            <a class="page-link" >Previous</a>
                        </li>

                        <li class="page-item"><a class="page-link" >{currentPage} - {totalPage}</a></li>

                        <li class={`page-item ${currentPage >= totalPage ? 'disabled' : ''}`}
                            onClick={() => {
                                getSeries(orderBy, searchData, currentPage + 1, startYear)
                            }}
                        >
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}