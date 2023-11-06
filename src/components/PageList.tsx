import React, {FC} from 'react';
import { IPage } from '../types/types';
import PageItem from './PageItem';
import "../App.css";
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import NewScenePage from '../pages/NewScenePage';
import SettingsPage from '../pages/SettingsPage';

interface PageListProps {
    pages: IPage[]
}

const PageList: FC<PageListProps> = ({pages}) => {
    return (
        <div className='page_list_container'>

            {/* <BrowserRouter>
                <div>
                    <div>
                    {pages.map(page =>
                        <NavLink to={page.address}>
                            <PageItem key={page.id} page={page}/>
                        </NavLink>
                    )}

                    </div>
                    <Route path={'/new_scene'} exact>
                        <NewScenePage/>
                    </Route>
                    <Route path={'/settings'}>
                        <SettingsPage/>
                    </Route>
                </div>
            </BrowserRouter> */}

            {pages.map(page =>
                <PageItem key={page.id} page={page}/>
            )}
        </div>
    )
};

export default PageList;
