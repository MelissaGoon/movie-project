import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import { ConfigContext } from './context/ConfigContext';


import { CONFIG_URL, GENRE_URL } from './globals/global-variables';
const App = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const [imgConfigResp, genreConfigResp] = await Promise.all([
                    fetch(`${CONFIG_URL}?api_key=${API_KEY}`),
                    fetch(`${GENRE_URL}&api_key=${API_KEY}`)
                ])

                const [imgConfig, genreConfig] = await Promise.all([imgConfigResp.json(), genreConfigResp.json()]);

                setConfig({
                    images: imgConfig.images,
                    genres: genreConfig.genres
                })
            } catch (e) {
                console.error(e.message);
                return (<div className="error-page">
                    <h1>Something went wrong</h1>
                    <p>We couldn’t load the application configuration.</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>)

            } finally {
                setLoading(false);
            }
        };

        fetchConfig();

    }, []);

    if (loading) {
        return (
            <div className="loading-page">
                <h1>Loading app...</h1>
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <ConfigContext.Provider value={config}>
            <AppRouter />
        </ConfigContext.Provider>
    )
}

export default App