export const calculateTrendingScore = (listing) =>{
    return listing.views + listing.favoritesCount * 3 ;
}