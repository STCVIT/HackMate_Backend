
const paginate = (array,n,page) => {
    const start = (page-1)*n
    const limit = n 
    const end = start + limit
    const answer = array.slice(start,end)
    return answer
}

module.exports = paginate