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
import { APP_FOLDER_NAME } from '../globals/global-variables';

const AppRouter = () => {

    return (
        <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
            <ListProvider>
                <ScrollHandler />
                <a className='screen-reader-text' href='#site-main'>Skip To Content</a>
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