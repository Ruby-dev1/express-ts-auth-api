export const getPagination = (
    totalCount: number,
    perPage: number,
    currentPage: number,
)=>{
    const totalpage = Math.ceil(totalCount/perPage) ;
    const nextPage = currentPage<totalpage ? currentPage+1 :null;
    const prevPage =currentPage>1 ? currentPage-1 : null; 
    
    
    return {
        total_Count: totalCount,
        total_Page: totalpage,
        next_Page: nextPage,
        prev_Page: prevPage,
        current_page : currentPage

    }




}