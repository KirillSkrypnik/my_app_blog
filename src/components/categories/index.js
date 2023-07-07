import { isArray, isEmpty } from "lodash";
import Link from "next/link";

const Categories = ({categories}) => {

    if (isEmpty (categories) || !isArray(categories) ){
        return null;
    }

    console.log(categories);


    return (
        <div className="grid_four_item">
            { categories.length ? categories.map( categorie => (
                <div key={ categorie?.id } className="grid_four_item_box">
                    <Link href={categorie?.permalink ?? '/'}>
                        <div>{categorie?.name}</div>
                    </Link>
                </div>
            )) : null }
        </div>
    )
}

export default Categories;