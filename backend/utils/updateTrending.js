export const calculateTrendingScore = (listing) =>{
    return listing.views + listing.favoriteCount * 3 ;
}