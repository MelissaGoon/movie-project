import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageAbout from "../pages/PageAbout";
import PageHome from "../pages/PageHome";
import PageList from "../pages/PageList";
import PageSingleMovie from "../pages/PageSingleMovie";
import PageNotFound from '../pages/PageNotFound';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageSearchResults from '../pages/PageSearchResults';
import ScrollHandler from './ScrollHandler';
import ListProvider from '../context/ListContextProvider';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <ListProvider>
                <ScrollHandler />

                <header>
                    <Nav />
                </header>

                <Routes>
                    <Route path='/' exact element={<PageHome />} />
                    <Route path='/about' element={<PageAbout />} />
                    <Route path='/my-list' element={<PageList />} />
                    <Route path='/movie/:id' element={<PageSingleMovie />} />
                    <Route path='/search' element={<PageSearchResults />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>

                <Footer />
            </ListProvider>
        </BrowserRouter>
    )
}

export default AppRouter