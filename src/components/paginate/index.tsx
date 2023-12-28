import React, { FC, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { trace } from 'console';
import Link from "next/link";

type indexProps = {pagination:number, pageCount:number, setPage: (page:number) => void, getProduct: () => void}

export const Paginate:FC<indexProps> = ({pagination, pageCount, setPage, getProduct}) => {
    const pages:JSX.Element[] = [];
    
    const getPage = ({target}) => {
        let page = target.textContent;
        setPage(Number(page));
        getProduct();
    }
    
    for(let index = 1; index <= pageCount; index++){
        pages.push(<li className="page-item" key={index}><Link className="page-link bg-dark text-white" href="#" onClick={getPage}>{index}</Link></li>)
    }
    
    const nextPage = () => {
        console.log(pagination)
        setPage(pagination+1);
        getProduct();
    }
    
    const backPage = () => {
        setPage(pagination-1);
        getProduct();
    }
    

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
                {pagination > 1 && 
                    <li className="page-item">
                        <Link className="page-link bg-dark text-white" href="#" aria-label="Previous" onClick={backPage}>
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>
                }

                {pages}
                
                
                {pagination < pageCount && <li className="page-item">
                    <Link className="page-link bg-dark text-white" href="#" aria-label="Next" onClick={nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>}
            </ul>
        </nav>
    )
}
