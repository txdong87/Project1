import React from "react";
import WebLayout from "../../Layout/Website";
import {
    BrowserRouter as Router, Route, Routes, Navigate
} from "react-router-dom";
import Home from "../../Page/Home";
import CharacterPage from "../../Page/Character";
import CharacterDetailPage from "../../Page/CharacterDetail";
import SeriesPage from '../../Page/Series';
import SeriesDetailPage from '../../Page/SeriesDetail';

window.PRIVATE_KEY = 'f0af76445581a094de25fb85ae4e01a2727c2e89'
window.PUBLIC_KEY = '095e110c67fc40ae23febc6253ff0c7b'

export default function MainApp(props) {
    return (
        <Router>
            <Routes>
                <Route exact path="/"
                    element={
                        <WebLayout {...props} >
                            <Home />
                        </WebLayout>
                    }
                />

                <Route exact path="/character"
                    element={
                        <WebLayout {...props} >
                            <CharacterPage />
                        </WebLayout>
                    }
                />

                <Route exact path="/character/:characterId"
                    element={
                        <WebLayout {...props} >
                            <CharacterDetailPage />
                        </WebLayout>
                    }
                />

                <Route exact path="/series"
                    element={
                        <WebLayout {...props} >
                            <SeriesPage />
                        </WebLayout>
                    }
                />

                <Route exact path="/series/:seriesId"
                    element={
                        <WebLayout {...props} >
                            <SeriesDetailPage />
                        </WebLayout>
                    }
                />

            </Routes>
        </Router>
    )
}
