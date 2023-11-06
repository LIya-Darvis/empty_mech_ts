import { FC } from "react";
import { IPage } from "../types/types";

interface PageItemProps {
    page: IPage
}

const PageItem: FC<PageItemProps> = ({page}) => {
    return (
        <div className="card">
            <h1 className="card_text">{page.title}</h1>
            
                
        </div>
    );
};

export default PageItem;
